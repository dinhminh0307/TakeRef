import { ResourceNotFoundError } from "../../../utils/exceptions/exception";
import type { ApiResponse } from "../../../utils/interfaces/api/ApiResponse";
import type { CitationResponse } from "../../../utils/interfaces/CitationResponse";

export async function getAllCitation(): Promise<ApiResponse> {
    const apiUrl =  import.meta.env.VITE_API_BASE_URL + "/citation/get/all";

    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'X-Frontend-Path': window.location.pathname
            },
            credentials: 'include'
        }
    )

    const result : ApiResponse = {
        headers: response.headers,
        status: response.status,
        ok: response.ok
    }

    

    console.log("Role:", response.headers.get("X-Role-Headers"));

    if(response.status === 404) {
        result.error = "User does not have any citations yet";
        return result;
    } else if(!response.ok) {
        result.error = "internal error";
        return result;
    }

    const data = await response.json();
    result.data = data;
    return result;
}