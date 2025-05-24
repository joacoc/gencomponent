import React, { createContext, useContext } from "react";
import type { ServerAction } from "@/types";

interface GenerativeContextProps {
  endpoint?: string;
  serverAction?: ServerAction;
}

const GenerativeContext = createContext<GenerativeContextProps>({});

interface Props {
  endpoint?: string;
  serverAction?: ServerAction;
  children: React.ReactNode;
}

export const GenerativeProvider = ({
  endpoint,
  serverAction,
  children,
}: Props) => {
  return (
    <GenerativeContext.Provider value={{ endpoint, serverAction }}>
      {children}
    </GenerativeContext.Provider>
  );
};

export const useGenerativeContext = () => {
  const context = useContext(GenerativeContext);
  if (!context) {
    return null;
  }
  return context;
};
