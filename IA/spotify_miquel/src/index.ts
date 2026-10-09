import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { trackRouter } from "./rutes/trackRutes";
import { countryRouter } from "./rutes/countryRutes";
import { userRouter } from "./rutes/userRutes";
import { artistRouter } from "./rutes/artistRutes";


//albumTrack + playlistTrack, només fer put i delete
//history no es fa de moment

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => { // _req → petició rebuda però no utilitzada
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/countries", countryRouter);

app.use("/users", userRouter);

app.use("/artists", artistRouter);

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a ${APICONFIG.host}:${APICONFIG.port}`);
});
