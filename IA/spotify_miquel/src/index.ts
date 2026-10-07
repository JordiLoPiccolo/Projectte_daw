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
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "./serveis/trackServeis";
import { ErrorService } from "./interfaces/error/errorService";
import { SuccessService } from "./interfaces/error/successService";
import { PutSuccessService } from "./interfaces/error/putSuccesService";
import { DeleteSuccessService } from "./interfaces/error/deleteSuccesService";
import { createCountry, getAllCountries, getCountryById, putCountry } from "./serveis/countryServeis";



const app: Express = express();
app.use(express.json());


app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});

app.get("/tracks", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.status(200).json(getAllTracks());
});




app.get("/tracks/:id", (req: Request, res: Response) => { // _req → petició rebuda però no utilitzada

    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string);

    if (findTrack) {
        return res.status(404).json({ message: `Track ${findTrack} not found lol` });
    }
    return res.status(200).json(findTrack);
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

    const result: SuccessService<TrackBD> | ErrorService = createTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    tracks.push((result as SuccessService<TrackBD>).data);
    return res.status(201).json(result);
});

app.put("/tracks/:id", (req: Request, res: Response) => {
    const result: SuccessService<TrackBD> | ErrorService = putTrack(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<TrackBD>).index;
    tracks[index] = (result as PutSuccessService<TrackBD>).data;


    return res.status(200).json(result);
});

app.delete("/tracks/:id", (req: Request, res: Response) => {

    const result: DeleteSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as DeleteSuccessService).index;
    tracks.splice(index, 1);

    return res.status(204).json({ message: `Truck delated` });
});

app.get("/countries", (_req: Request, res: Response) => {
    return res.status(200).json(getAllCountries());
});

app.get("/countries/:id", (req: Request, res: Response) => {
    const findCountry: CountryBD | undefined = getCountryById(req.params.id as string);

    if (findCountry) {
        return res.status(404).json({ message: `Track ${findCountry} not found lol` });
    }
    return res.status(200).json(findCountry);
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
    const result: SuccessService<CountryBD> | ErrorService = createCountry(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    countries.push((result as SuccessService<CountryBD>).data);

    return res.status(201).json(result);
});
app.put("/countries/:id", (req: Request, res: Response) => {
    const result: SuccessService<CountryBD> | ErrorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<CountryBD>).index;
    countries[index] = (result as PutSuccessService<CountryBD>).data;


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
