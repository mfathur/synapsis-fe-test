"use server";

import {
  GOREST_API_BASE_URL,
  GOREST_API_HEADER_PAGINATION_PAGES,
  GOREST_API_HEADER_PAGINATION_TOTAL,
} from "@/utils/constant";

export async function getPaginatedBlogs(currentPage: number) {
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

export async function getBlog(postId: number) {
  const response = await fetch(`${GOREST_API_BASE_URL}/posts/${postId}`, {
    method: "GET",
    cache: "force-cache",
  });

  const data = (await response.json()) as Blog;

  return data;
}

export async function getBlogComments({
  postId,
  page,
  perPage,
}: {
  postId: number;
  page: number;
  perPage: number;
}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });
  const response = await fetch(
    `${GOREST_API_BASE_URL}/posts/${postId}/comments?${queryParams}`,
    { method: "GET", cache: "force-cache" }
  );

  const headers = response.headers;
  const pageCount = Number(headers.get(GOREST_API_HEADER_PAGINATION_PAGES));
  const totalData = Number(headers.get(GOREST_API_HEADER_PAGINATION_TOTAL));
  const data = (await response.json()) as BlogComment[];

  return { data, totalData, pageCount };
}

export async function getBlogAuthor(userId: string) {
  const response = await fetch(`${GOREST_API_BASE_URL}/users/${userId}`, {
    method: "GET",
    cache: "force-cache",
  });

  const data = (await response.json()) as User;

  if (!data.name) {
    data.name = "Anonymous";
  }

  return data;
}

export async function getBlogDetail({
  postId,
  page,
  perPage,
}: {
  postId: number;
  page: number;
  perPage: number;
}) {
  const postPromise = getBlog(postId);
  const postCommentsPromise = getBlogComments({ postId, page, perPage });

  const [post, postComments] = await Promise.all([
    postPromise,
    postCommentsPromise,
  ]);

  const author = await getBlogAuthor(post.user_id);

  return { post, postComments, author };
}
