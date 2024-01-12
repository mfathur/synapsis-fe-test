"use client";

import { SIDENAV_ITEMS } from "@/utils/constant";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const className =
    "md:w-60 h-screen flex-1 fixed hidden md:flex bg_primary pt-8 ml-0";

  return (
    <>
      <nav className={`${className}`}>
        <div className="flex flex-col pr-11 lg:pr-0">
          {SIDENAV_ITEMS.map((sideNav, idx) => (
            <MenuItem key={`${sideNav.title}-${idx}`} {...sideNav} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default SideBar;
