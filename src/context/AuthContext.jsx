"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { useRouter } from "next/navigation";
export const createAuthContext = createContext();
import { signOut } from "aws-amplify/auth";

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();
  const [isLoader, setIsLoader] = useState(false)
  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      const users = await fetchUserAttributes();
      setUserDetails(users);
      setUser(user);
    } catch (err) {
      // toast.error("Error fetching user");
    }
  };

  const getAuthSession = async () => {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      if (tokens) {
        document.cookie = `token=${tokens.idToken}; path=/;`;
        localStorage.setItem("token", tokens.idToken);
        setToken(tokens.idToken);
      }
    } catch (err) {
      // handle error appropriately
    }
  };

  const fetchAuthData = async () => {
    document.cookie = "refreshing=true; path=/;";

    await getUser();
    await getAuthSession();

    document.cookie =
      "refreshing=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  // const handleLogout = async () => {
  //   setIsLoader(true)
  //   try {
  //     await signOut();
  //     setters?.setToken(null);
  //     setters?.setUser(null);
  //     localStorage.removeItem("token");
  //     toast.success("Logout Succesfully");
  //     setIsLoader(false)

  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //     toast.error(error.message);
  //     setIsLoader(false)

  //   }
  // };
  const handleLogout = async () => {
    setIsLoader(true);
    try {
      // Cognito sign out
      await signOut();
  
      // Clear cookie
      document.cookie = 'token=; Max-Age=0; path=/;';
  
      // Clear local values
      setters?.setToken(null);
      setters?.setUser(null);
      localStorage.removeItem("token");
  
      toast.success("Logout Successfully");
      router.push('/login')

    } catch (error) {
      console.error("Error signing out:", error);
      toast.error(error.message);
    } finally {
      setIsLoader(false);
    }
  };
  

  useEffect(() => {
    if (!user) {
      fetchAuthData();
    }
  }, [user, token]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const states = {
    user,
    token,
    userDetails,
    email,
    isLoader
  };
  const setters = {
    setUser,
    setToken,
    setEmail,
  };
  const actions = {
    getUser,
    getAuthSession,
    fetchAuthData,
    handleLogout
  };

  const values = {
    states,
    actions,
    setters,
  };



  return (
    <createAuthContext.Provider value={values}>
      {children}{" "}
    </createAuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(createAuthContext);
  if (context === undefined) {
    throw new Error("useLoggedIn must be used within a LoggedInProvider");
  }
  return context;
};
