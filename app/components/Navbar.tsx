import React from "react";
import { Link } from "react-router-dom";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>

        {auth?.isAuthenticated && (
          <button
            onClick={auth.signOut}
            className="danger-gradient text-white rounded-full px-4 py-2 cursor-pointer w-fit transition-all duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
