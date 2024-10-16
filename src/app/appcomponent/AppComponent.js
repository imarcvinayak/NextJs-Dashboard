"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import LoginForm from "../login/LoginForm";
import ChartList from "../clientComponents/ChartList";
import * as am5 from "@amcharts/amcharts5";

function AppComponent() {
  const initialtheme = am5.color(6779356);
  const [isLogin, setIsLogin] = useState(false);
  const [colors, setColors] = useState([initialtheme]);
  const [user, setUser] = useState({});
  useLayoutEffect(() => {
    if (!user) return;
    setIsLogin(localStorage.getItem("LOGGED_IN"));
    setUser(JSON.parse(localStorage.getItem("LOGGED_IN")));
  }, []);
  useEffect(() => {
    if (!user) return;
    setUser({
      ...user,
      themePalette: colors,
    });
    localStorage.setItem("LOGGED_IN", JSON.stringify(user));
  }, [isLogin]);
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
