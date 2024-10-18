"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import LoginForm from "../login/LoginForm";
import ChartList from "../clientComponents/ChartList";
import * as am5 from "@amcharts/amcharts5";

function AppComponent() {
  const initialtheme = am5.color(6779356);
  const [isLogin, setIsLogin] = useState(null);
  const [colors, setColors] = useState([initialtheme]);
  const [user, setUser] = useState({});
  useEffect(() => {
    // Check local storage for login status after component mounts
    const storedLoginStatus = localStorage.getItem("LOGGED_IN");
    const storedUser = JSON.parse(localStorage.getItem("LOGGED_IN"));

    if (storedLoginStatus) {
      setIsLogin(true); // If login data exists, set the login state
      setUser(storedUser || {});
    } else {
      setIsLogin(false); // No login data, show the login form
    }
  }, []);

  useEffect(() => {
    if (!isLogin || !user) return;

    setUser((prevUser) => ({
      ...prevUser,
      themePalette: colors,
    }));

    localStorage.setItem("LOGGED_IN", JSON.stringify(user));
  }, [isLogin, colors]);


  if (isLogin === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {!isLogin ? (
        <LoginForm
          setIsLogin={setIsLogin}
          setUser={setUser}
          initialtheme={initialtheme}
        />
      ) : (
        <ChartList
          colors={colors}
          setColors={setColors}
          initialtheme={initialtheme}
        />
      )}
    </>
  );
}

export default AppComponent;
