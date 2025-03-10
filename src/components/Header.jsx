import Navbar from "./Navbar";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header className="flex flex-col justify-center absolute w-full z-10">
      <div className="top-0 fixed z-20 w-full flex justify-between items-center py-3 sm:py-4 px-5 sm:px-16 bg-slate-900">
        <Sidebar />

        <Logo />

        <div className="items-center gap-4 hidden sm:flex">
          <button className="text-white font-semibold cursor-pointer hover:bg-white hover:text-slate-900 py-1 hover:px-3 px-3 border-2 border-white">
            Register
          </button>
          <button className="text-white font-semibold cursor-pointer hover:bg-white hover:text-slate-900 py-1 hover:px-3 border-2 border-transparent hover:border-white px-3">
            Sign In
          </button>
        </div>
      </div>

      <Navbar />
    </header>
  );
};

export default Header;
