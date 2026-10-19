import { Router } from "express";
import { deleteCountryController, getAllCountriesController, getCountryByIdController, postCountryController, putCountryController } from "../controllers/countryController";

export const countryRouter: Router = Router();

countryRouter.get("/", getAllCountriesController);
countryRouter.get("/:id", getCountryByIdController);
countryRouter.post("/", postCountryController);
countryRouter.put("/:id", putCountryController);
countryRouter.delete("/:id", deleteCountryController);