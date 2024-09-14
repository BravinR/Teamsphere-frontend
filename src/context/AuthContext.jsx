import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		const storedUser = JSON.parse(localStorage.getItem("chat-user"));
		return storedUser || null;
	});

	useEffect(() => {
		const checkToken = async () => {
			console.log("Checking token:", authUser);
			if (authUser && authUser.jwt) {
				try {
					const response = await fetch(`${import.meta.env.VITE_API_HOST}/auth/verify`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${authUser.jwt}`
						}
					});
					
					if (response.status === 401) {
						const errorMessage = await response.text();
						console.error("Unauthorized:", errorMessage);
						localStorage.removeItem("chat-user");
						setAuthUser(null);
					} else if (!response.ok) {
						console.error("Unexpected error during token verification");
						// Optionally, you might want to keep the user logged in if it's a server-side issue
						// For now, we'll log them out to be safe
						localStorage.removeItem("chat-user");
						setAuthUser(null);
					}
					// If response is ok, do nothing as the user is already authenticated
				} catch (error) {
					console.error("Token verification failed:", error);
					localStorage.removeItem("chat-user");
					setAuthUser(null);
				}
			}
		};
		checkToken();
	}, [authUser]);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};