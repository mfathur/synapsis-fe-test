import AddUserModal from "./_components/AddUserModal";
import SearchBox from "./_components/SearchBox";
import UserTable from "./_components/Table";
import { Suspense } from "react";
import UserTableSkeleton from "./_components/TableSkeleton";
import BtnAddUser from "./_components/BtnAddUser";
import EditUserModal from "./_components/EditUserModal";
import DeleteUserDialog from "./_components/DeleteUserDialog";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    userId?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const userId = Number(searchParams?.userId);

  return (
    <main className="flex min-h-screen flex-col pb-11 md:p-16 pt-20">
      <p className="text-4xl font-medium mb-10 px-4">Users</p>
      <div className="flex md:justify-between mb-6 px-4 md:px-0">
        <SearchBox />
        <BtnAddUser />
      </div>
      <Suspense key={query + currentPage} fallback={<UserTableSkeleton />}>
        <UserTable query={query} page={currentPage} />
      </Suspense>

      <DeleteUserDialog userId={userId} />
      <AddUserModal />
      <EditUserModal userId={userId} />
    </main>
  );
}

export default Page;
