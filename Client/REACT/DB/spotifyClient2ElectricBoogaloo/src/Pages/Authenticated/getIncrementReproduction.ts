import type { AddHistory } from "../../APIManagement/History/Interfaces/HistoryCreate";
import { ENV } from "../../Config/env";

export async function getIncrementReproduction(trackId: string): Promise<boolean> {
    const newHistory: AddHistory = {
        user: "921C4AA8-930B-4A10-91D0-CB3BCD3B12C4",
        track: trackId
    };

    const response = await fetch(`${ENV.API_BASE_URL}/tracks/user/history`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newHistory)
    });

    if (!response.ok) {
        return false;
    }

    await response.json();
    return true;
}
