import { Router } from "express";
import { deleteCountryController, getAllCountryController, getCountryByIdController, postCountryController, putCountryController } from "../controllers/countryController";

export const countryRouter: Router = Router();

countryRouter.get("/", getAllCountryController);
countryRouter.get("/:id", getCountryByIdController);
countryRouter.post("/", postCountryController);
countryRouter.put("/:id", putCountryController);
countryRouter.delete("/:id", deleteCountryController);