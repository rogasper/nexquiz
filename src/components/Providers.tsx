"use client";

import { ThemeProvider } from "next-themes";
import { createContext, useState } from "react";

export const DataContext = createContext({});

function Providers({ children }) {
  const [data, setData] = useState();
  const [soal, setSoal] = useState([]);
  const [language, setLanguage] = useState(null);
  const [isCode, setIsCode] = useState(false);
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <DataContext.Provider
        value={{
          data,
          setData,
          soal,
          setSoal,
          isCode,
          setIsCode,
          language,
          setLanguage,
        }}
      >
        {children}
      </DataContext.Provider>
    </ThemeProvider>
  );
}

export default Providers;
