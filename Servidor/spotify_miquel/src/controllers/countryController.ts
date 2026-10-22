import { countries } from "../data/country/country";
import { CountryBD } from "../interfaces/countries/countryBD";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SelectSuccessService } from "../interfaces/error/SelectsuccessService";
import { SuccessService } from "../interfaces/error/successService";
import { createCountry, deleteCountry, getAllCountries, getCountryById, putCountry } from "../serveis/countryServeis";
import { Response,Request } from "express";

export async function getAllCountriesController(_req: Request, res: Response): Promise<Response> {
    const countryBD: CountryBD[] = await getAllCountries();
    return res.status(200).json(countryBD);
}

export async function getCountryByIdController(req: Request, res: Response): Promise<Response> {

    const result: SelectSuccessService<CountryBD> | ErrorService = await getCountryById(req.params.id as string);


    if (!result.success) {
        return res.status(result.code).json({ message: (result as ErrorService).message });
    }
    return res.status(result.code).json(result);
}

export async function postCountryController(req: Request, res: Response): Promise<Response> {

    const result: SuccessService<CountryBD> | ErrorService = await createCountry(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        return res.status(201).json(result);
}

export async function putCountryController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<number> | ErrorService = await putCountry(req.body,req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).json(result);
}

export async function deleteCountryController(req: Request, res: Response): Promise<Response> {
    const result: DeleteSuccessService | ErrorService = await deleteCountry(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(201).send();
}