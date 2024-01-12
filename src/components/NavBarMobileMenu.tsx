"use client";

import { SIDENAV_ITEMS } from "@/utils/constant";
import MenuItem from "./MenuItem";
import { MdClose } from "react-icons/md";

type Props = {
  onMenuItemClick: () => void;
};

const NavBarMobileMenu = ({ onMenuItemClick }: Props) => {
  return (
    <div className="w-60 bg_primary flex flex-col h-screen fixed z-40">
      <button
        className="text-2xl hover:bg-slate-400 dark:hover:bg-slate-800 transition-colors rounded-md p-1 self-end m-4 text-white/50 hover:text-white"
        onClick={onMenuItemClick}
      >
        <MdClose />
      </button>
      <div className="flex flex-col pr-11 lg:pr-0 ">
        {SIDENAV_ITEMS.map((sideNav, idx) => (
          <MenuItem
            key={`${sideNav.title}-${idx}`}
            {...sideNav}
            onClick={onMenuItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NavBarMobileMenu;
