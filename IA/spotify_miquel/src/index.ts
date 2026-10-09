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
import { getAllUsers, getUserById } from "./serveis/userServeis";
import { deleteTrackController, getAllTracksController, getTrackByIdController, postTrackController, putTrackController } from "./controllers/trackController";
import { trackRouter } from "./rutes/trackRutes";
import { getAllCountryController } from "./controllers/countryController";
import { countryRouter } from "./rutes/countryRutes";



const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);


app.use("/countries", countryRouter);


app.get("/users", (_req: Request, res: Response) => {
    return res.status(200).json(getAllUsers);
});

app.get("/users/:id", (req: Request, res: Response) => {

    const findUser: UserBD | undefined = getUserById(req.params.id as string);

    if (!findUser) {
        return res.status(404).json({ message: `Track ${findUser} not found lol` });
    }
    return res.status(200).json(findUser);
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

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});
