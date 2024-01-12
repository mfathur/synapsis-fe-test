"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdAdd, MdPersonAdd } from "react-icons/md";

const BtnAddUser = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleBtnClick = () => {
    const params = new URLSearchParams(searchParams);

    params.set("showAddModal", "y");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <button
        className="btn_contained rounded-lg py-2 px-3 block md:hidden ml-2"
        onClick={handleBtnClick}
      >
        <MdPersonAdd className="text-2xl" />
      </button>

      <button
        className="btn_contained rounded-lg py-2 px-3 hidden md:block"
        onClick={handleBtnClick}
      >
        <div className="flex justify-center items-center gap-x-1">
          <MdAdd className="text-2xl" />
          Add user
        </div>
      </button>
    </>
  );
};

export default BtnAddUser;
