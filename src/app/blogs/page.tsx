import BlogItem from "./_components/BlogItem";
import BtnPageChanger from "@/components/BtnPageChanger";
import { Suspense } from "react";
import BlogItemSkeleton from "./_components/BlogItemSkeleton";
import { getPaginatedBlogs } from "./actions";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const { data: blogs, pageCount } = await getPaginatedBlogs(currentPage);

  return (
    <main className="flex min-h-screen flex-col items-center md:p-16 pt-20">
      <p className="text-4xl font-medium mb-10">Blogs</p>
      <Suspense key={currentPage} fallback={<BlogItemSkeleton />}>
        <div>
          {blogs.map((blog, index) => (
            <BlogItem blog={blog} key={`${index}-${blog.id}`} />
          ))}
        </div>
        <div className="flex mt-4 mb-8 md:mt-8">
          <BtnPageChanger currentPage={currentPage} maxPage={pageCount} />
        </div>
      </Suspense>
    </main>
  );
}
