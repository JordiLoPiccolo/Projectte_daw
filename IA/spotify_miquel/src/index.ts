import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { tracks } from "./data/track/track";
import { TrackBD } from "./interfaces/track/trackBD";
import { Track } from "./interfaces/track/track";
import { isValidTrack } from "./validators/trackValidator";

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



app.post("/tracks/:id", (req: Request, res: Response) => {
    const track: Track = req.body;
    if (!isValidTrack(track)) {
        return res.status(400).json({ message: "fuck you"});
    }
    // les corretes son dades

    return res.status(201).json(track);
});


app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});

