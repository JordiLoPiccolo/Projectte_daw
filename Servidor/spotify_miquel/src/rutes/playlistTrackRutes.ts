import { Router } from "express";

import { deletePlaylistTrackController, getAllPlaylistTracksController, getPlaylistTrackByIdController, postPlaylistTrackController, putPlaylistTrackController } from "../controllers/playlistTrackController";

export const playlistTrackRouter: Router = Router();

playlistTrackRouter.get("/", getAllPlaylistTracksController);
playlistTrackRouter.get("/:id", getPlaylistTrackByIdController);
playlistTrackRouter.post("/", postPlaylistTrackController);
playlistTrackRouter.put("/:id", putPlaylistTrackController);
playlistTrackRouter.delete("/:id", deletePlaylistTrackController);