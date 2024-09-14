import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGoogleLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const googleLogin = async (credential) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_HOST}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential }),
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