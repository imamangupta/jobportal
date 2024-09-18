import { BaseApiUrl } from "./constanst";


export const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false; // No token found in localStorage
    }

    try {
        const response = await fetch(`${BaseApiUrl}/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            // If the response is not OK (e.g., 401 Unauthorized), handle it
            localStorage.removeItem('token');
            return false;
        }

        const json = await response.json();
        if (json) {
            console.log(json);
            return true;
        }

        // Handle cases where the token might be invalid but no error is thrown
        localStorage.removeItem('token');
        return false;

    } catch (error) {
        console.error("Error checking token:", error);
        // On any error (e.g., network issues), remove the token and return false
        localStorage.removeItem('token');
        return false;
    }
};
