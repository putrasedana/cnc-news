import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../utils";

const Navbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    setActive(currentItem ? currentItem.name : "");
  }, [location.pathname]);

  return (
    <nav className="border-gray-300 border-b-2 w-full bg-white justify-center hidden md:flex transition-all duration-300 relative mt-[67.2px]">
      <ul className="flex text-sm font-semibold">
        {menuItems.map((item) => (
          <li key={item.name} className="relative">
            <Link
              to={item.path}
              onClick={() => {
                setActive(item.name);
              }}
            >
              <button
                className={`py-4 px-3 hover:bg-slate-200 cursor-pointer ${
                  active === item.name
                    ? "text-black font-bold"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </button>
            </Link>
            {active === item.name && (
              <div className="absolute left-0 w-full h-[3px] bg-black top-[3.1rem]"></div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
