import type { CitationResponse } from "../../../../utils/interfaces/CitationResponse";

export async function sendRmitHarvardWebsiteCitationRequest(body: any): Promise<any> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/harvard/website';
    
    const response = await fetch(
        apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    );

    if(!response.ok) {
        throw Error('Failed to send request');
    }
    const data: any = await response.json();
    return data;
}

export async function saveCitationRequest(body: any) : Promise<CitationResponse> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/harvard/save/citation';

    const response = await fetch(
        apiUrl,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }
    )
    if(!response.ok) {
        throw new Error("Fail to send request")
    }
    const data = await response.json();
    return data;
}