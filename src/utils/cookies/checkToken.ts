export default async function hasValidToken(): Promise<boolean> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL + '/health/check';
    
        const response = await fetch(
            apiUrl,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
    
        if(!response.ok) {
            return false;
        } 
    
        return true;
}