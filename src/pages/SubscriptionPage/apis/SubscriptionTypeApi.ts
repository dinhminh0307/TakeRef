import type { ApiResponse } from "../../../utils/interfaces/api/ApiResponse";

export async function fetchAllSubscriptionType(): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/subscription/type/get/all';
    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
    )

    const result : ApiResponse = {
        status: response.status,
        ok: response.ok,
        headers: response.headers
    }
    
    if(response.status === 500) {
        result.error = 'Internal Error'
        return result;
    } else if(response.status === 404) {
        result.error = 'The page has not added any subscription type yet'
        return result;
    } else if(response.status === 403) {
        result.error = 'User has no right to access the resource, please contact admin'
        return result;
    }

    const data = await response.json();
    result.data = data
    return result;
}

export async function saveSubscriptionTypeRequest(body: any): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/subscription/type/add';
    const response = await fetch(
        apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        },
    )

    const result : ApiResponse = {
        status: response.status,
        ok: response.ok,
        headers: response.headers
    }
    
    if(response.status === 500) {
        result.error = 'Internal Error'
        return result;
    } else if(response.status === 403) {
        result.error = 'User has no right to access the resource, please contact admin'
        return result;
    }

    const data = await response.json();
    result.data = data
    return result;
}