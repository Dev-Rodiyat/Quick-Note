import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { MdOutlineClear } from "react-icons/md";

const Header = ({ setSearchQuery, searchQuery }) => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("noteTheme") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("noteTheme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-md px-4 py-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">

                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="text-xl font-bold tracking-tight text-orange-500 whitespace-nowrap">
                        QuickNote 📝
                    </div>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-md transition-all md:hidden duration-200 ease-in-out hover:scale-110 active:scale-95 hover:bg-orange-200/40 dark:hover:bg-zinc-200/10 md:ml-4"
                    >
                        {darkMode ? (
                            <FiMoon className="w-5 h-5 text-zinc-800 dark:text-white transition-colors duration-300" />
                        ) : (
                            <FiSun className="w-5 h-5 text-yellow-400 transition-colors duration-300" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-2 w-full md:max-w-md shadow-sm">
                    <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search notes, content or tags..."
                        className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none min-w-0"
                    />

                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")}>
                            <MdOutlineClear className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition" />
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-md transition-all duration-200 hidden md:block ease-in-out hover:scale-110 active:scale-95 hover:bg-orange-200/40 dark:hover:bg-zinc-200/10 md:ml-4"
                >
                    {darkMode ? (
                        <FiMoon className="w-5 h-5 text-zinc-800 dark:text-white transition-colors duration-300" />
                    ) : (
                        <FiSun className="w-5 h-5 text-yellow-400 transition-colors duration-300" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default Header;