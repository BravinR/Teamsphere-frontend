import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ email, password, username, file}) => {
		const success = handleInputErrors({email, password, username, file});
		if (!success) return;

		setLoading(true);
		try {
			const formData = { email, password, username, file };
			const authData = new FormData();
			Object.keys(formData).forEach(key => {
				authData.append(key, formData[key]);
			});
            const request = await fetch(`/auth/signup`, {
                method: 'POST',
                body: authData,
                cache: 'no-store',
            })

			const data = await request.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ email, password, username, file }) {
	if (!email || !username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

    if (!file) {
        toast.error("Please upload a file");
        return false;
    }

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxFileSize) {
        toast.error("File size must be less than 10MB");
        return false;
    }

	return true;
}
