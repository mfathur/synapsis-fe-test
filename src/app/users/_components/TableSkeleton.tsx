const UserTableSkeleton = () => {
  const TableRow = () => {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3 flex flex-col gap-4 h-11">
            <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-2 w-64 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        </th>
        <td className="px-6 py-4">
          <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex text-2xl gap-x-6">
            <div className="h-2 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-2 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
          </div>
        </td>
      </tr>
    );
  };

  const TablePagination = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center animate-pulse">
        <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="flex mt-4 md:mt-0"></div>
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
            {Array.from({ length: 5 }).map((_el, index) => (
              <TableRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </div>
  );
};

export default UserTableSkeleton;
