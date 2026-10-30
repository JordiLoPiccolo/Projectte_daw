import { Router } from "express";
import { deleteAlbumController, getAlbumByIdController, getAllAlbumsController, postAlbumController, putAlbumController } from "../controllers/albumController";

export const albumRouter: Router = Router();

albumRouter.get("/", getAllAlbumsController);
albumRouter.get("/:id", getAlbumByIdController);
albumRouter.post("/", postAlbumController);
albumRouter.put("/:id", putAlbumController);
albumRouter.delete("/:id", deleteAlbumController);