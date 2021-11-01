
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access) {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + user.access
        }; // for Spring Boot back-end
        //   return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return {};
    }
}