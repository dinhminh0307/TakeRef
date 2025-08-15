import { AuthorizationError, ResourceNotFoundError } from "../../../../utils/exceptions/exception";
import type { ApiResponse } from "../../../../utils/interfaces/api/ApiResponse";

export async function getAllCitationType(): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/citation/type/get';
    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

    if(response.status === 500) {
        result.error = "Internal Error";
        return result;
    } else if(response.status === 404) {
        result.error = "No CItation Type added yet";
        return result;
    } else if(response.status === 403) {
        result.error = "User has no right access the resource"
        return result;
    }

    const data = await response.json();
    result.data = data
    return result;
}