import React from "react";
import { useRecoilState } from "recoil";

import { theme as atomTheme } from "../../atoms/theme";
import ActiveLink from "../ActiveLink/ActiveLink";

export default function Navigation() {
  const [theme, setTheme] = useRecoilState(atomTheme);

  const isDarkMode = theme === "dark";

  const switchTheme = `w-6 h-6 relative rounded-full transition duration-500 transform dark:bg-yellow-500 bg-purple-900 ${
    isDarkMode ? "translate-x-2" : "translate-x-8"
  } p-1 text-white `;

  const _changeTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("light");
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white max-w-full p-4 text-lg  shadow-2xl z-10 dark:bg-gray-700 dark:text-white font-serif ">
      <div className=" mx-auto flex justify-between">
        <ul className="inline-flex space-x-4">
          <li>
            <ActiveLink href="/">Home</ActiveLink>
          </li>
          <li>
            <ActiveLink href={"/paintings"}>Paintings</ActiveLink>
          </li>
          <li>
            <ActiveLink href={"/projects"}>Projects</ActiveLink>
          </li>
        </ul>
        <button
          className="w-16 h-8 rounded-full bg-white dark:bg-gray-900 flex items-center transition duration-300 focus:outline-none shadow-inner"
          onClick={() => _changeTheme()}
          aria-label="darkmode toggle"
        >
          <div id="switch-toggle" className={switchTheme}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
}
