// "use client"
import { useEffect, useState } from "react"
import Icons from "./Icons"
import { useTheme } from "next-themes";

function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button id="theme-toggle" type="button" onClick={() => theme == "light" ? setTheme('dark') : setTheme('light')} class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
            <Icons.Moon className={theme === "light" ? "" : "hidden"} />
            <Icons.Sun className={theme === "light" ? "hidden" : ""} />
        </button>
    )
}

export default ThemeToggle