export default function checkTokenExpired(): boolean {
    const cookies = document.cookie.split('; ');
    // return true if token not exist
    return !cookies.some(cookie => cookie.startsWith(`${"accessToken"}=`));
}