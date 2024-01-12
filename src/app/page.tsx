import BlogItem from "./_components/BlogItem";
import BtnPageChanger from "@/components/BtnPageChanger";
import { Suspense } from "react";
import BlogItemSkeleton from "./_components/BlogItemSkeleton";
import {
  GOREST_API_BASE_URL,
  GOREST_API_HEADER_PAGINATION_PAGES,
} from "@/utils/constant";

async function getPaginatedBlogs(currentPage: number) {
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    per_page: "10",
  });

  const response = await fetch(`${GOREST_API_BASE_URL}/posts?${queryParams}`, {
    cache: "force-cache",
    method: "GET",
  });

  const headers = response.headers;
  const data = (await response.json()) as Blog[];

  const pageCount = Number(headers.get(GOREST_API_HEADER_PAGINATION_PAGES));

  return { data, pageCount };
}

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
