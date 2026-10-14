import { histories } from "../data/history/data.history";
import { DeleteSuccessService } from "../interfaces/error/deleteSuccesService";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSuccesService";
import { SuccessService } from "../interfaces/error/successService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { createHistory, deleteHistory, getAllHistories, getHistoryById, putHistory } from "../serveis/historyServeis";
import { Response,Request } from "express";

export function getAllHistoriesController(_req:Request,res: Response): Response {
    return res.status(200).json(getAllHistories());
}

export function getHistoryByIdController(req: Request, res: Response): Response {


    const findHistory: HistoryBD | undefined = getHistoryById(req.params.id as string);

    if (!findHistory) {
        return res.status(404).json({ message: `History ${findHistory} not found lol` });
    }
    return res.status(200).json(findHistory);
}

export function postHistoryController(req: Request, res: Response): Response {
    const result: SuccessService<HistoryBD> | ErrorService = createHistory(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
    
        histories.push((result as SuccessService<HistoryBD>).data);
        return res.status(201).json(result);
}

export function putHistoryController(req: Request, res: Response): Response {
    const result: SuccessService<HistoryBD> | ErrorService = putHistory(req.body, req.params.id);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    const index: number = (result as PutSuccessService<HistoryBD>).index;
    histories[index] = (result as PutSuccessService<HistoryBD>).data;


    return res.status(200).json(result);
}

export function deleteHistoryController(req: Request, res: Response): Response {

     const result: DeleteSuccessService | ErrorService = deleteHistory(req.params.id as string);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message });
        }
    
        const index: number = (result as DeleteSuccessService).index;
        histories.splice(index, 1);
    
        return res.status(204).json({ message: `His story delated` });
}