'use client'
import { getToken, saveCredentials, saveToken, setLogout } from "@/services/localService";
import React, { createContext, useState, useEffect } from "react";
const AuthContext = createContext(); // create context here

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const hasAccess = getToken()
		if (hasAccess) {
			setIsAuthenticated(true);
		}
	}, []);

	const loginUser = ({token, user}) => {
		saveToken(token)
		saveCredentials(user)
		setIsAuthenticated(true);
	};

	const logoutUser = () => {
		setLogout()
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
