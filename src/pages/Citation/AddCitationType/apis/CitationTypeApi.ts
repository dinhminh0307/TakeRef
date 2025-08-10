import { AuthorizationError } from "../../../../utils/exceptions/exception";

export async function saveCitationType(body: any) : Promise<any> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/citation/type/add';

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
    )

    if(response.status === 403) {
        throw new AuthorizationError("User must login again");
    } else if(!response.ok){
        throw new Error("Internal error");
    }

    const data = await response.json();
    return data;
}