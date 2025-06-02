"use client";

import React from "react";
import GlobalContext from "./GlobalContext";
import classNames from "classnames";

export const App = ({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) => {
  const darkMode = React.useContext(GlobalContext)?.darkMode.darkMode;

  return darkMode === null ? (
    <></>
  ) : (
    <div
      className={classNames("background w-screen h-screen flex", {
        ["dark"]: darkMode,
      })}
    >
      <div
        className={classNames(
          "w-[min(20rem,20vw)] flex-shrink-0 h-full sidebar",
          {
            ["dark"]: darkMode,
          },
        )}
      >
        {sidebar}
      </div>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default App;
