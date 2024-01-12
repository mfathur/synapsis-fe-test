"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import NavBarMobileMenu from "./NavBarMobileMenu";

const NavBarMobile = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(true);
  };

  const handleMenuItemClick = () => {
    setShowMenu(false);
  };

  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setShowMenu(false);
      }}
    />
  );

  return (
    <nav
      className={`bg_primary md:hidden z-20 sticky top-0 left-0 right-0 h-14 flex [&>*]:my-auto`}
    >
      <button
        className="text-2xl flex text-white ml-2 px-2"
        onClick={handleMenuClick}
      >
        <FiMenu />
      </button>

      {showMenu ? (
        <>
          <ModalOverlay />
          <NavBarMobileMenu onMenuItemClick={handleMenuItemClick} />
        </>
      ) : null}
    </nav>
  );
};

export default NavBarMobile;
