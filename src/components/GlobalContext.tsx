"use client";
import React, { createContext } from "react";

interface GlobalState {
  darkMode: {
    darkMode: boolean | null;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean | null>>;
  };
}

export const GlobalContext = createContext<GlobalState | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    Promise.resolve(localStorage.getItem("dark-mode")).then(
      (localStorageDarkMode) => {
        setDarkMode(localStorageDarkMode === "true");
      },
    );
  }, [setDarkMode]);

  React.useEffect(() => {
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <GlobalContext.Provider
      value={{
        darkMode: {
          darkMode,
          setDarkMode,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
