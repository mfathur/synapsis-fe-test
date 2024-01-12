"use client";

import Dialog from "@/components/Dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteUser } from "../actions";

type Props = { userId: number };

const DeleteUserDialog = ({ userId }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const removeAssociatedParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("userId");
    params.delete("showDeleteDialog");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClose = () => {
    removeAssociatedParams();
  };

  const handleConfirmDelete = async () => {
    await deleteUser(userId);
    removeAssociatedParams();
  };

  return (
    <Dialog
      title="Are you sure?"
      stateTag="showDeleteDialog"
      onClose={handleClose}
      showActionBtn={true}
      btnPositiveText="Yes"
      onBtnPositiveClick={handleConfirmDelete}
      btnNegativeText="No"
      onBtnNegativeClick={handleClose}
    >
      <div className="p-4 md:p-5">
        <p className="text-gray-900 dark:text-white ">
          Do you want to delete this user?
        </p>
      </div>
    </Dialog>
  );
};

export default DeleteUserDialog;
