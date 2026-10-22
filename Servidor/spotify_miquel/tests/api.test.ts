import assert from "node:assert/strict";
import { once } from "node:events";
import { AddressInfo } from "node:net";
import test, { TestContext } from "node:test";
import sql, { ConnectionPool } from "mssql";

process.env.DB_USER ??= "api-test";
process.env.DB_PASSWORD ??= "api-test";
process.env.DB_HOST ??= "localhost";
process.env.DB_PORT ??= "1433";
process.env.DB_NAME ??= "api-test";
process.env.DB_ENCRYPT ??= "false";
process.env.DB_TRUST_SERVER_CERTIFICATE ??= "true";

type QueryResult = {
    recordset: unknown[];
    rowsAffected: number[];
};

type QueryHandler = (query: string, inputs: Record<string, unknown>) => QueryResult;

let queryHandler: QueryHandler = () => {
    throw new Error("Unexpected database query in API test");
};

const fakePool = {
    request: () => {
        const inputs: Record<string, unknown> = {};
        return {
            input(name: string, _type: unknown, value: unknown) {
                inputs[name] = value;
                return this;
            },
            query(query: string) {
                return Promise.resolve(queryHandler(query, inputs));
            },
        };
    },
} as unknown as ConnectionPool;

sql.connect = async () => fakePool;

const { app } = require("../src/app") as typeof import("../src/app");

async function startServer(context: TestContext): Promise<string> {
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    context.after(() => new Promise<void>((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    }));

    const address = server.address() as AddressInfo;
    return `http://127.0.0.1:${address.port}`;
}

test("GET / returns the API description", async (context) => {
    const response = await fetch(await startServer(context));

    assert.equal(response.status, 200);
    assert.match(await response.text(), /API Spotify/);
});

test("GET /tracks returns tracks from the database service", async (context) => {
    const tracks = [{ id: "track-1", title: "Song", artist: "Artist", duration: 180 }];
    queryHandler = (query) => {
        assert.match(query, /select \* from track/i);
        return { recordset: tracks, rowsAffected: [] };
    };

    const response = await fetch(`${await startServer(context)}/tracks`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), tracks);
});

test("GET /tracks/:id returns 404 when the track does not exist", async (context) => {
    queryHandler = (query, inputs) => {
        assert.match(query, /where track\.id = @id/i);
        assert.equal(inputs.id, "missing");
        return { recordset: [], rowsAffected: [] };
    };

    const response = await fetch(`${await startServer(context)}/tracks/missing`);

    assert.equal(response.status, 404);
    assert.match((await response.json()).message, /Track not found/);
});

test("POST /tracks rejects invalid input", async (context) => {
    let databaseWasCalled = false;
    queryHandler = () => {
        databaseWasCalled = true;
        throw new Error("Invalid input should be rejected before querying the database");
    };

    const response = await fetch(`${await startServer(context)}/tracks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: "", artist: "artist-1", duration: 180 }),
    });

    assert.equal(response.status, 400);
    assert.equal(databaseWasCalled, false);
});

const invalidTrackCases: Array<[string, Record<string, unknown>]> = [
    ["empty title", { title: "", artist: "artist-1", duration: 180 }],
    ["whitespace-only title", { title: "   \t ", artist: "artist-1", duration: 180 }],
    ["title over 100 characters", { title: "x".repeat(101), artist: "artist-1", duration: 180 }],
    ["zero duration", { title: "Song", artist: "artist-1", duration: 0 }],
    ["negative duration", { title: "Song", artist: "artist-1", duration: -1 }],
    ["duration below one", { title: "Song", artist: "artist-1", duration: 0.99 }],
    ["null artist", { title: "Song", artist: null, duration: 180 }],
    ["null title", { title: null, artist: "artist-1", duration: 180 }],
    ["null duration", { title: "Song", artist: "artist-1", duration: null }],
    ["empty artist", { title: "Song", artist: "", duration: 180 }],
    ["missing title", { artist: "artist-1", duration: 180 }],
    ["missing duration", { title: "Song", artist: "artist-1" }],
];

for (const [description, body] of invalidTrackCases) {
    test(`POST /tracks rejects ${description}`, async (context) => {
        let databaseWasCalled = false;
        queryHandler = () => {
            databaseWasCalled = true;
            throw new Error("Invalid track must not reach the database");
        };

        const response = await fetch(`${await startServer(context)}/tracks`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        });

        assert.equal(response.status, 400);
        assert.equal(databaseWasCalled, false);
    });
}

const validTrackCases: Array<[string, string, number]> = [
    ["ordinary title", "Quiet song", 180],
    ["trimmed title", "  Quiet song  ", 180],
    ["normalized spaces", "Quiet    song", 180],
    ["maximum-length title", "x".repeat(100), 180],
    ["minimum duration", "Song", 1],
    ["fractional duration", "Song", 180.5],
    ["unicode title", "Cançó d'estiu 🎵", 210],
    ["tab-separated title", "Quiet\t song", 90],
];

for (const [description, title, duration] of validTrackCases) {
    test(`POST /tracks creates a track with ${description}`, async (context) => {
        queryHandler = (query, inputs) => {
            assert.match(query, /insert into track/i);
            assert.equal(inputs.title, title.trim().replace(/\s+/g, " "));
            assert.equal(inputs.artist_id, "artist-1");
            assert.equal(inputs.duration, duration);
            return { recordset: [], rowsAffected: [1] };
        };

        const response = await fetch(`${await startServer(context)}/tracks`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, artist: "artist-1", duration }),
        });

        assert.equal(response.status, 201);
        assert.deepEqual(await response.json(), { success: true, data: 1, code: 201 });
    });
}

const trackLists = [
    [],
    [{ id: "track-1", title: "One", artist: "Artist", duration: 1 }],
    [
        { id: "track-1", title: "One", artist: "Artist", duration: 1 },
        { id: "track-2", title: "Two", artist: "Artist", duration: 2 },
    ],
    Array.from({ length: 10 }, (_, index) => ({
        id: `track-${index}`,
        title: `Song ${index}`,
        artist: "Artist",
        duration: index + 1,
    })),
];

for (const [index, tracks] of trackLists.entries()) {
    test(`GET /tracks returns a database result containing ${tracks.length} track(s) (case ${index + 1})`, async (context) => {
        queryHandler = (query) => {
            assert.match(query, /select \* from track/i);
            return { recordset: tracks, rowsAffected: [] };
        };

        const response = await fetch(`${await startServer(context)}/tracks`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), tracks);
    });
}

const singleTracks = [
    { id: "track-a", title: "First", artist: "Artist A", duration: 120 },
    { id: "track-b", title: "Second", artist: "Artist B", duration: 240 },
    { id: "track-c", title: "Third", artist: "Artist C", duration: 1 },
    { id: "track-d", title: "Fourth", artist: "Artist D", duration: 999 },
];

for (const track of singleTracks) {
    test(`GET /tracks/${track.id} returns the matching track`, async (context) => {
        queryHandler = (query, inputs) => {
            assert.match(query, /where track\.id = @id/i);
            assert.equal(inputs.id, track.id);
            return { recordset: [track], rowsAffected: [] };
        };

        const response = await fetch(`${await startServer(context)}/tracks/${track.id}`);

        assert.equal(response.status, 200);
        assert.deepEqual(await response.json(), { success: true, code: 200, data: track });
    });
}

const deleteCases: Array<[string, number, number]> = [
    ["first track", 1, 201],
    ["second track", 1, 201],
    ["missing track", 0, 404],
    ["already deleted track", 0, 404],
];

for (const [id, rowsAffected, status] of deleteCases) {
    test(`DELETE /tracks/${id} handles ${rowsAffected ? "a deleted row" : "no matching row"}`, async (context) => {
        queryHandler = (query, inputs) => {
            assert.match(query, /delete from track/i);
            assert.equal(inputs.id, id);
            return { recordset: [], rowsAffected: [rowsAffected] };
        };

        const response = await fetch(`${await startServer(context)}/tracks/${id}`, {
            method: "DELETE",
        });

        assert.equal(response.status, status);
        if (rowsAffected) {
            assert.equal(await response.text(), "");
        } else {
            assert.match((await response.json()).message, /Track not found/);
        }
    });
}

const validUpdateCases: Array<[string, string, number]> = [
    ["new title", "Updated song", 180],
    ["trimmed title", "  Updated song  ", 180],
    ["minimum duration", "Short song", 1],
    ["unicode title", "Cançó nova 🎶", 240],
];

for (const [description, title, duration] of validUpdateCases) {
    test(`PUT /tracks updates a track with ${description}`, async (context) => {
        queryHandler = (query, inputs) => {
            assert.match(query, /update track/i);
            assert.equal(inputs.id, "track-1");
            assert.equal(inputs.title, title.trim().replace(/\s+/g, " "));
            assert.equal(inputs.artist_id, "artist-1");
            assert.equal(inputs.duration, duration);
            return { recordset: [], rowsAffected: [1] };
        };

        const response = await fetch(`${await startServer(context)}/tracks/track-1`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, artist: "artist-1", duration }),
        });

        assert.equal(response.status, 201);
        assert.deepEqual(await response.json(), { success: true, data: 1, code: 200 });
    });
}
