export default function checkTokenExpired(): boolean {
    const token = localStorage.getItem("accessToken");
    if(token === null) {
        return false;
    }
    return true;
}