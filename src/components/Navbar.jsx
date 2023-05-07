"use client"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link";

function Navbar() {
    return (

        <nav className="p-3 border-gray-200 rounded bg-slate-100 dark:bg-slate-800 ">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link href="/" className="flex items-center">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" /> */}
                    <span className="self-center text-slate-700 text-xl font-semibold whitespace-nowrap dark:text-slate-100">NEXQUIZ</span>
                </Link>
                <div data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <ThemeToggle />
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar