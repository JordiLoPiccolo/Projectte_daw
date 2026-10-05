import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/trackValidator";
import { randomUUID } from "crypto";
import { Artist } from "./interfaces/artist/artist";
import { isValidArtist } from "./validators/artistValidator";
import { ArtistBD } from "./interfaces/artist/artistBD";
import { artists } from "./data/data.artist";
import { User } from "./interfaces/user/user";
import { UserBD } from "./interfaces/user/userBD";
import { users } from "./data/user/users";
import { countries } from "./data/country/country";
import { isValidUser } from "./validators/userValidator";
import { Country } from "./interfaces/countries/country";
import { isValidCountry } from "./validators/countryValidator";
import { validCountries } from "./interfaces/artist/paisos";
import { CountryBD } from "./interfaces/countries/countryBD";



const app: Express = express();
app.use(express.json());


app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});




app.get("/tracks/:id", (req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    const idTrack: string = req.params.id as string;
    const track: TrackBD[] = tracks.filter(
        (t: TrackBD) => { return t.id === idTrack }
    );

    if (track.length === 0) {
        return res.status(404).json({ message: `Track ${idTrack} not found lol` });
    }
    return res.status(200).json(track);
});

app.get("/users", (_req: Request, res: Response) => {
    return res.status(200).json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
    const idUser: string = req.params.id as string;
    const user: UserBD[] = users.filter(
        (u: UserBD) => { return u.id === idUser }
    );

    if (!user) {
        return res.status(404).json({ message: `User ${idUser} not found` });
    }
    return res.status(200).json(user);
});


/**
 * Saber totes les llistes de reproduccio
 * /usuari/:id/playlists
 * 
 * Les ultimes canços que ha escoltat un usuari:
 * /usuari/:id/songs/latest
 * /ususaris/:id/historial
 * 
 * Les ultimes cançons (uploaded) a l'aplicatiu
 * 
 * /songs/uploaded/latest
 * 
 * Totes les cançons d'una playlist d'un usuari 
 * /usuaris/:id/playlist/:idPlayList/songs
 * 
 * El meu perfil 
 * /usuaris/profile (me)
 * 
 * /usuaris/:id/profile
 * 
 * Musica més reproduida
 * 
 * /songs/popular
 * 
 * Més reproduida d'un artista
 * 
 * statistics/
 * 
 *      /artist/:id/songs/popular
 * 
 *      /artists/followers/popular
 * 
 *      /artist/users/reproductions
 */



app.post("/tracks", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "fuck you" });
    }
    // les correctes son dades
    const uuid: string = randomUUID();

    const trackRecord: TrackBD = {
        id: uuid,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist,
        duration: track.duration
    };
    tracks.push(trackRecord)

    return res.status(201).json(trackRecord);
});

app.put("/tracks/:id", (req: Request, res: Response) => {
    const track: Track = req.body;

    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "fuck you" });
    }

    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack }
    );

    if (index === -1) {
        return res.status(404).json({ message: `Track ${idTrack} not found lol` });
    }

    tracks[index] = {
        id: idTrack,
        title: track.title.trim().replace(/\s+/g, " "),
        artist: track.artist,
        duration: track.duration
    };
    return res.status(200).json(tracks[index]);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {

    const idTrack: string = req.params.id as string;
    const index: number = tracks.findIndex(
        (t: TrackBD) => { return t.id === idTrack }
    );
    if (index === -1) {
        return res.status(404).json({ message: `Track ${idTrack} not found lol` });
    }

    tracks.splice(index, 1);

    return res.status(204).json({ message: `Truck delated` });
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(countries);
});

app.get("/countries/:id", (req: Request, res: Response) => {
    const idCountry: string = req.params.id as string;
    const country: CountryBD[] = countries.filter(
        (u: CountryBD) => { return u.id === idCountry }
    );

    if (!country) {
        return res.status(404).json({ message: `User ${idCountry} not found` });
    }
    return res.status(200).json(country);
});

app.post("/artists", (req: Request, res: Response) => {

    if (!isValidArtist(req.body)) {
        return res.status(400).json({ message: "artista no valid" });
    }

    const artist: Artist = req.body;
    const country: Country | undefined = isValidCountry(artist.country);
    if (country === undefined) {
        return res.status(400).json({ message: "artista no valid" });
    }
    const artistRecord: ArtistBD = {
        id: randomUUID(),
        aName: artist.aName.trim().replace(/\s+/g, " "),
        rName: artist.rName.trim().replace(/\s+/g, " "),
        country,
    };
    artists.push(artistRecord)
    return res.status(201).json(artistRecord);

})
app.post("/countries", (req: Request, res: Response) => {
    const country: Country = req.body;

    if (!isValidCountry(country)) {
        return res.status(400).json({ message: "Invalid country. Provide a non-empty id and name." });
    }

    const countryRecord: Country = {
        id: country.id.trim().toUpperCase(),
        name: country.name.trim().replace(/\s+/g, " "),
    };
    if (validCountries.some((existing: Country) => existing.id === countryRecord.id)) {
        return res.status(409).json({ message: `Country ${countryRecord.id} already exists` });
    }

    validCountries.push(countryRecord); 

    return res.status(201).json(countryRecord);
});
app.put("/countries/:id", (req: Request, res: Response) => {
    const country: Country = req.body;

    if (!isValidCountry(req.body)) {
        return res.status(400).json({ message: "Pais invalid. Com tu." });
    }

    const idCountry: string = req.params.id as string;
    const index: number = countries.findIndex(
        (c: CountryBD) => { return c.id === idCountry }
    );

    if (index === -1) {
        return res.status(404).json({ message: `User ${idCountry} not found` });
    }

    countries[index] = {
        id: idCountry,
        name: country.name.trim(),
       
    };
    return res.status(200).json(countries[index]);
});
app.delete("/countries/:id", (req: Request, res: Response) => {

    const idCountry: string = req.params.id as string;
    const index: number = countries.findIndex(
        (t: CountryBD) => { return t.id === idCountry }
    );
    if (index === -1) {
        return res.status(404).json({ message: `Track ${idCountry} not found lol` });
    }

    countries.splice(index, 1);

    return res.status(204).json({ message: `Truck delated` });
});

app.post("/users", (req: Request, res: Response) => {
    const user: User = req.body;
    
    if (!isValidUser(req.body)) {
        return res.status(400).json({ message: "Invalid user. Provide a valid email and country with id and name." });
    }


    const userBD: UserBD = {
        id: randomUUID(),
        email: user.email.trim(),
        country: {
            id: user.country.id.trim(),
            name: user.country.name.trim(),
        },
    };
    users.push(userBD);

    return res.status(201).json(userBD);
});

app.put("/users/:id", (req: Request, res: Response) => {
    const user: User = req.body;

    if (!isValidUser(req.body)) {
        return res.status(400).json({ message: "Usuari invalid. Com tu." });
    }

    const idUser: string = req.params.id as string;
    const index: number = users.findIndex(
        (u: UserBD) => { return u.id === idUser }
    );

    if (index === -1) {
        return res.status(404).json({ message: `User ${idUser} not found` });
    }

    users[index] = {
        id: idUser,
        email: user.email.trim(),
        country: {
            id: user.country.id.trim(),
            name: user.country.name.trim(),
        },
    };
    return res.status(200).json(countries[index]);
});

app.delete("/users/:id", (req: Request, res: Response) => {
    const idUser: string = req.params.id as string;
    const index: number = users.findIndex((user: UserBD) => user.id === idUser);
    if (index === -1) {
        return res.status(404).json({ message: `User ${idUser} not found` });
    }

    countries.splice(index, 1);
    return res.status(204).send();
});

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});
