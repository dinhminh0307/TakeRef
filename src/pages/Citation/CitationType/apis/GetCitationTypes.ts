import { ResourceNotFoundError } from "../../../../utils/exceptions/exception";

export async function getAllCitationType() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/citation/type/get';
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

    if(response.status === 500) {
        throw new Error("Internal Error");
    } else if(response.status === 404) {
        throw new ResourceNotFoundError("No CItation Type added yet");
    }

    const data = await response.json();
    return data;
}