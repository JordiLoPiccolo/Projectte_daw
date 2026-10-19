import { countries } from "../data/country/country";
import { CountryBD } from "../interfaces/countries/countryBD";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { createCountry, getAllCountries, getCountryById, putCountry } from "../serveis/countryServeis";
import { Response,Request } from "express";

export async function getAllCountriesController(_req: Request, res: Response): Promise<Response> {
    const countryBD: CountryBD[] = await getAllCountries();
    return res.status(200).json(countryBD);
}

export function getCountryByIdController(req: Request, res: Response): Response {

    const findCountry: CountryBD | undefined = getCountryById(req.params.id as string);

    if (!findCountry) {
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