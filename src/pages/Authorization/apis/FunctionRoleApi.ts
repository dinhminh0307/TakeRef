import type { ApiResponse } from "../../../utils/interfaces/api/ApiResponse";

export async function fetchAllFunctionRole(): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/function/all';

    const response = await fetch(
        apiUrl,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
    );

    const result : ApiResponse = {
        headers: response.headers,
        ok: response.ok,
        status: response.status
    }

    if(response.status === 404) {
        result.error = 'There is no function yet';
        return result
    } else if(response.status === 500){
        result.error = 'Internal error';
        return result
    } else if(response.status === 403) {
        result.error = 'User not authorized';
        return result
    }

    const data = await response.json();
    result.data = data;
    return result;
}

export async function addFunction(body: any): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/function/add';

    const response = await fetch(
        apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    );

    const result : ApiResponse = {
        headers: response.headers,
        ok: response.ok,
        status: response.status
    }

     if(response.status === 500){
        result.error = 'Internal error';
        return result
    } else if(response.status === 403) {
        result.error = 'User not authorized';
        return result
    }

    const data = await response.json();
    result.data = data;
    return result;
}

export async function deleteFunction(body: any): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/function/delete';

    const response = await fetch(
        apiUrl,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    );

    const result : ApiResponse = {
        headers: response.headers,
        ok: response.ok,
        status: response.status
    }

     if(response.status === 500){
        result.error = 'Internal error';
        return result
    } else if(response.status === 403) {
        result.error = 'User not authorized';
        return result
    }

    const data = await response.json();
    result.data = data;
    return result;
}

export async function updateFunction(body: any): Promise<ApiResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/function/update';

    const response = await fetch(
        apiUrl,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    );

    const result : ApiResponse = {
        headers: response.headers,
        ok: response.ok,
        status: response.status
    }

     if(response.status === 500){
        result.error = 'Internal error';
        return result
    } else if(response.status === 403) {
        result.error = 'User not authorized';
        return result
    }

    const data = await response.json();
    result.data = data;
    return result;
}