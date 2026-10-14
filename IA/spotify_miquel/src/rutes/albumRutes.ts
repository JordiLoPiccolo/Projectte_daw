import { Router } from "express";
import { deleteAlbumController, getAlbumByIdController, getAllAlbumController, postAlbumController, putAlbumController } from "../controllers/albumController";

export const albumRouter: Router = Router();

albumRouter.get("/", getAllAlbumController);
albumRouter.get("/:id", getAlbumByIdController);
albumRouter.post("/", postAlbumController);
albumRouter.put("/:id", putAlbumController);
albumRouter.delete("/:id", deleteAlbumController);