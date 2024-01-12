"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";

type Props = {
  userId: number;
};

const TableRowAction = ({ userId }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const addURLParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.set("userId", userId.toString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleBtnEditClick = () => {
    addURLParams("showEditModal", "y");
  };

  const handleBtnDeleteClick = () => {
    addURLParams("showDeleteDialog", "y");
  };

  return (
    <div className="flex text-2xl gap-x-6">
      <button onClick={handleBtnEditClick}>
        <MdEdit className="dark:hover:text-white hover:text-primary" />
      </button>
      <button onClick={handleBtnDeleteClick}>
        <MdDelete className="dark:hover:text-white hover:text-primary" />
      </button>
    </div>
  );
};

export default TableRowAction;
