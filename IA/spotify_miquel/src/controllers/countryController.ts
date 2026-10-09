import { countries } from "../data/country/country";
import { tracks } from "../data/track/track";
import { CountryBD } from "../interfaces/countries/countryBD";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createCountry, getAllCountries, getCountryById, putCountry } from "../serveis/countryServeis";
import { createTrack, deleteTrack, getAllTracks, getTrackById, putTrack } from "../serveis/trackServeis";
import { Response,Request } from "express";

export function getAllCountryController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllCountries())
}

export function getCountryByIdController(req: Request, res: Response): Response {

    const findCountry: CountryBD | undefined = getCountryById(req.params.id as string);

    if (findCountry) {
        return res.status(404).json({ message: `Track ${findCountry} not found lol` });
    }
    return res.status(200).json(findCountry);
}

export function postCountryController(req: Request, res: Response): Response {
     const result: SuccessService<CountryBD> | ErrorService = createCountry(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        countries.push((result as SuccessService<CountryBD>).data);
    
        return res.status(201).json(result);
}

export function putCountryController(req: Request, res: Response): Response {
    const result: SuccessService<CountryBD> | ErrorService = putCountry(req.body, req.params.id);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as PutSuccessService<CountryBD>).index;
        countries[index] = (result as PutSuccessService<CountryBD>).data;
    
    
        return res.status(200).json(countries[index]);
}

export function deleteCountryController(req: Request, res: Response): Response {


    const result: SuccessService<CountryBD> | ErrorService = putCountry(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<CountryBD>).index;

    countries.splice(index, 1);

    return res.status(204).json({ message: `Cuntree delated` });
}