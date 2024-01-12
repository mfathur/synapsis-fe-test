"use client";

import { SIDENAV_ITEMS } from "@/utils/constant";
import MenuItem from "./MenuItem";

type Props = {};

const SideBar = (props: Props) => {
  const className =
    "md:w-60 h-screen flex-1 fixed hidden md:flex bg_primary pt-8";
  const show = true;
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  return (
    <>
      <nav className={`${className} ${appendClass}`}>
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
