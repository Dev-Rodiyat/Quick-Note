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
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 py-3 shadow-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            <div className="text-xl font-bold tracking-tight text-orange-500">
                NotesApp 📝
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-2 w-full max-w-md shadow-sm">
                <FiSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes, content or tags..."
                    className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                />

                {searchQuery && (
                    <button onClick={() => setSearchQuery("")}>
                        <MdOutlineClear className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition" />
                    </button>
                )}
            </div>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-md transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 
             hover:bg-orange-200/40 dark:hover:bg-zinc-200/10"
            >
                {darkMode ? (
                    <FiMoon className="w-5 h-5 text-zinc-800 dark:text-white transition-colors duration-300" />
                ) : (
                    <FiSun className="w-5 h-5 text-yellow-400 transition-colors duration-300" />
                )}
            </button>
        </header>
    );
};

export default Header;