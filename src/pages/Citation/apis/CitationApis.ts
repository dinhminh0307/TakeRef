import { ResourceNotFoundError } from "../../../utils/exceptions/exception";
import type { CitationResponse } from "../../../utils/interfaces/CitationResponse";

export async function getAllCitation(): Promise<CitationResponse[]> {
    const apiUrl =  import.meta.env.VITE_API_BASE_URL + "/citation/get/all";

    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: 'include'
        }
    )

    if(response.status === 404) {
        throw new ResourceNotFoundError("User does not have any citations yet");
    } else if(!response.ok) {
        throw new Error("internal error");
    }

    const data = await response.json();
    return data;
}