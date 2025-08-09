
export async function  sendLoginRequest(body: any): Promise<any> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/login';
    const response  = await fetch(
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

export async function sendRegisterRequest(body: any): Promise<any> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(
        `${apiUrl}/signup`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    )

    if(!response.ok) {
        throw new Error("Failed to fetch request")
    }

    const data : any = response.json();
    return data;
}

