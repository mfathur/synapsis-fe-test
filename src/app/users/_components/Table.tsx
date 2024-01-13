import {
  GOREST_API_BASE_URL,
  GOREST_API_HEADER_PAGINATION_PAGES,
  GOREST_API_HEADER_PAGINATION_TOTAL,
} from "@/utils/constant";
import BtnPageChanger from "@/components/BtnPageChanger";
import TableRowAction from "./TableRowAction";

const getPaginatedUsers = async ({
  name,
  page,
  perPage,
}: {
  name: string;
  page: number;
  perPage: number;
}) => {
  const queryParams = new URLSearchParams({
    name: name,
    page: page.toString(),
    per_page: perPage.toString(),
  });

  const response = await fetch(`${GOREST_API_BASE_URL}/users?${queryParams}`, {
    cache: "force-cache",
    method: "GET",
  });

  const headers = response.headers;
  const pageCount = Number(headers.get(GOREST_API_HEADER_PAGINATION_PAGES));
  const totalData = Number(headers.get(GOREST_API_HEADER_PAGINATION_TOTAL));
  const data = (await response.json()) as User[];

  return { data, pageCount, totalData };
};

type Props = {
  query: string;
  page: number;
};

const UserTable = async ({ query, page }: Props) => {
  const perPage = 5;
  const {
    data: users,
    pageCount,
    totalData,
  } = await getPaginatedUsers({
    name: query,
    page: page,
    perPage,
  });

  const TableRow = (user: User) => {
    const statusColor =
      user.status === "active" ? "bg-green-500" : "bg-red-500";

    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">
              <p>{user.name}</p>
            </div>
            <div className="font-normal text-gray-500">
              <p>{user.email}</p>
            </div>
          </div>
        </th>
        <td className="px-6 py-4">
          <p className="capitalize">{user.gender}</p>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full bg-green-500 me-2 ${statusColor}`}
            ></div>{" "}
            <p className="capitalize">{user.status}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <TableRowAction userId={user.id} />
        </td>
      </tr>
    );
  };

  const TablePagination = () => {
    const firstElement = totalData === 0 ? 0 : perPage * (page - 1) + 1;
    const lastElement = Math.min(firstElement + perPage - 1, totalData);
    return (
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
        <p>
          Showing <span className="font-bold">{firstElement}</span>-
          <span className="font-bold">{lastElement}</span> of{" "}
          <span className="font-bold">{totalData}</span>
        </p>
        <div className="flex mt-4 md:mt-0">
          <BtnPageChanger currentPage={page} maxPage={pageCount + 1} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 md:px-0">
        <table className="md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow {...user} key={`${index}-${user.id}`} />
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </div>
  );
};

export default UserTable;
