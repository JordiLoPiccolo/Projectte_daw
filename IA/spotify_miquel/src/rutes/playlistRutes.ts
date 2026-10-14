import { Router } from "express";
import { deletePlaylistController, getAllPlaylistController, getPlaylistByIdController, postPlaylistController, putPlaylistController } from "../controllers/playlistController";

export const playlistRouter: Router = Router();

playlistRouter.get("/", getAllPlaylistController);
playlistRouter.get("/:id", getPlaylistByIdController);
playlistRouter.post("/", postPlaylistController);
playlistRouter.put("/:id", putPlaylistController);
playlistRouter.delete("/:id", deletePlaylistController);