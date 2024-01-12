"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  maxPage: number;
};

const BtnPageChanger = ({ currentPage, maxPage }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const moveToPage = (currentPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", currentPage.toString());

    router.replace(`${pathname}?${params}`);
  };

  const handleBtnPrevClick = () => {
    moveToPage(currentPage - 1);
  };

  const handleBtnNextClick = () => {
    moveToPage(currentPage + 1);
  };

  return (
    <>
      <button
        onClick={handleBtnPrevClick}
        className="btn_contained py-1 px-2 rounded-l-lg"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={handleBtnNextClick}
        className="btn_contained py-1 px-2 rounded-r-lg"
        disabled={currentPage === maxPage}
      >
        Next
      </button>
    </>
  );
};

export default BtnPageChanger;
