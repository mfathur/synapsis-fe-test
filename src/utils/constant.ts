import { IoPersonSharp } from "react-icons/io5";
import { TbNews } from "react-icons/tb";

export const GOREST_API_BASE_URL = "https://gorest.co.in/public/v2";
export const GOREST_API_HEADER_PAGINATION_PAGES = "x-pagination-pages";
export const GOREST_API_HEADER_PAGINATION_TOTAL = "x-pagination-total";
export const GOREST_API_ACCESS_TOKEN = process.env.GO_REST_API_ACCESS_TOKEN;

export const SIDENAV_ITEMS: SideNavItem[] = [
  { title: "Blogs", path: "/blogs", Icon: TbNews },
  { title: "Users", path: "/users", Icon: IoPersonSharp },
];
