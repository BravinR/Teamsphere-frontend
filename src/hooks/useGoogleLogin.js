import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGoogleLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const googleLogin = async (access_token) => {
        setLoading(true);
        try {
            // First, fetch user info from Google
            const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
            if (!googleResponse.ok) {
                throw new Error('Failed to fetch user info from Google');
            }
            const googleUserInfo = await googleResponse.json();

            // Then, send this info to your backend
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ googleUserInfo}),
            });

            if (!response.ok) {
                throw new Error('Google login failed');
            }

            const data = await response.json();
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, googleLogin };
};

export default useGoogleLogin;