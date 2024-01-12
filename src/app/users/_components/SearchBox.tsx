"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

type Props = {};

const SearchBox = (props: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  useEffect(() => {
    // change url param
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchKeyword) {
      params.set("query", debouncedSearchKeyword);
    } else {
      params.delete("query");
    }
    params.set("page", "1"); // set back to page 1
    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchKeyword]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3">
        <MdOutlineSearch className="text-xl dark:text-gray-400 text-gray-900" />
      </div>
      <input
        type="text"
        className="block grow md:grow-0 py-2 ps-10 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg md:w-80 bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Search by name"
        onChange={(e) => {
          setSearchKeyword(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
};

export default SearchBox;
