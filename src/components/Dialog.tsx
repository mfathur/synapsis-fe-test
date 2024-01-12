"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  title: string;
  stateTag: string;
  onClose: () => void;
  btnPositiveText?: string;
  onBtnPositiveClick?: () => void;
  btnNegativeText?: string;
  onBtnNegativeClick?: () => void;
  showActionBtn?: boolean;
  children: React.ReactNode;
};

const Dialog = ({
  title,
  stateTag,
  onClose,
  btnPositiveText,
  onBtnPositiveClick,
  btnNegativeText,
  onBtnNegativeClick,
  showActionBtn = false,
  children,
}: Props) => {
  const searchParams = useSearchParams();

  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get(stateTag);

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const handleCloseDialog = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handlePositiveBtnClick = () => {
    if (onBtnPositiveClick) onBtnPositiveClick();
    handleCloseDialog();
  };

  const handleNegativeBtnClick = () => {
    if (onBtnNegativeClick) onBtnNegativeClick();
    handleCloseDialog();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-xl backdrop:bg-gray-800/50"
      >
        <div className="w-[500px] max-w-full dark:bg-gray-700 flex flex-col">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={handleCloseDialog}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <MdClose />
            </button>
          </div>
          <div>
            {children}
            {showActionBtn ? (
              <div className="flex gap-4 justify-end p-4">
                <button
                  className="btn_outlined px-5 py-2 rounded-lg"
                  onClick={handleNegativeBtnClick}
                >
                  {btnNegativeText}
                </button>
                <button
                  className="btn_contained px-5 py-2 rounded-lg"
                  onClick={handlePositiveBtnClick}
                >
                  {btnPositiveText}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </dialog>
    ) : null;

  return dialog;
};

export default Dialog;
