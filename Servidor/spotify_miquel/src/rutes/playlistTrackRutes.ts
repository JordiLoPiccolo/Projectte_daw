import { Router } from "express";

import { deletePlaylistTrackController, getAllPlaylistTracksController, postPlaylistTrackController } from "../controllers/playlistTrackController";

export const playlistTrackRouter: Router = Router();

playlistTrackRouter.get("/", getAllPlaylistTracksController);
playlistTrackRouter.post("/", postPlaylistTrackController);
playlistTrackRouter.delete("/:id", deletePlaylistTrackController);