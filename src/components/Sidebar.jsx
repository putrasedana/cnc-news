import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../utils";
import { CgClose } from "react-icons/cg";
import { BiMenu, BiSearch } from "react-icons/bi";
import clsx from "clsx";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const [search, setSearch] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    setActive(currentItem ? currentItem.name : "");
  }, [location.pathname]);

  const handleToggleSidebar = (isSearchButton) => {
    setIsVisible(!isVisible);

    if (isSearchButton) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-10"
          onClick={() => setIsVisible(false)}
        ></div>
      )}

      <div className="flex items-center gap-4 gap-x-10 md:gap-x-6">
        <button
          onClick={() => handleToggleSidebar(false)}
          className="cursor-pointer"
        >
          <BiMenu className="w-8 h-8 sm:h-6 text-white " />
        </button>
        <button
          onClick={() => handleToggleSidebar(true)}
          className="cursor-pointer"
        >
          <BiSearch className="w-8 h-8 sm:h-6 text-white " />
        </button>

        <aside
          className={clsx(
            isVisible ? "" : "invisible",
            `w-full md:w-[60%] lg:w-[40%] xl:w-[25%] min-h-screen bg-white p-4 border-r-2 fixed z-20 top-0 left-0`
          )}
        >
          <div className="w-full flex justify-end mb-5">
            <button
              onClick={() => handleToggleSidebar(false)}
              className="cursor-pointer hover:text-white hover:bg-slate-900 p-1 rounded-sm"
            >
              <CgClose size={30} />
            </button>
          </div>

          <div className="flex items-center mb-4 ">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border-1 rounded-l-sm focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              ref={searchInputRef}
            />
            <button
              onClick={() => {
                handleSearch();
                handleToggleSidebar(false);
              }}
              className="bg-slate-900 text-white p-2 rounded-r-sm hover:bg-slate-700 transition cursor-pointer"
            >
              <BiSearch size={26} />
            </button>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActive(item.name);
                    window.scrollTo({ top: 0 });
                    setIsVisible(false);
                  }}
                >
                  <button
                    className={`w-full text-left p-3 rounded cursor-pointer ${
                      active === item.name
                        ? "bg-slate-900 text-white "
                        : "text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
