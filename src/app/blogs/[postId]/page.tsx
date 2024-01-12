import {
  GOREST_API_BASE_URL,
  GOREST_API_HEADER_PAGINATION_PAGES,
  GOREST_API_HEADER_PAGINATION_TOTAL,
} from "@/utils/constant";
import BlogCommentItem from "../_components/BlogCommentItem";

const getBlog = async (postId: number) => {
  const response = await fetch(`${GOREST_API_BASE_URL}/posts/${postId}`, {
    method: "GET",
    cache: "force-cache",
  });

  const data = (await response.json()) as Blog;

  return data;
};

const getBlogComments = async ({
  postId,
  page,
  perPage,
}: {
  postId: number;
  page: number;
  perPage: number;
}) => {
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
};

const getBlogAuthor = async (userId: string) => {
  const response = await fetch(`${GOREST_API_BASE_URL}/users/${userId}`, {
    method: "GET",
    cache: "force-cache",
  });

  const data = (await response.json()) as User;

  if (!data.name) {
    data.name = "Anonymous";
  }

  return data;
};

const getBlogDetail = async ({
  postId,
  page,
  perPage,
}: {
  postId: number;
  page: number;
  perPage: number;
}) => {
  const postPromise = getBlog(postId);
  const postCommentsPromise = getBlogComments({ postId, page, perPage });

  const [post, postComments] = await Promise.all([
    postPromise,
    postCommentsPromise,
  ]);

  const author = await getBlogAuthor(post.user_id);

  return { post, postComments, author };
};

type Props = {
  params: { postId: string };
  searchParams?: {
    commentPage?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const currentPage = Number(searchParams?.commentPage || "1");
  const commentPerPage = 5;

  const { post, postComments, author } = await getBlogDetail({
    postId: Number(params.postId),
    page: currentPage,
    perPage: commentPerPage,
  });

  const shownCommentsCount = currentPage * postComments.totalData;

  return (
    <main className="flex min-h-screen flex-col items-center md:p-16 md:pt-20 pt-6">
      <h3 className="font-semibold text-2xl md:text-4xl text-primary-dark mt-8 ">
        {post.title}
      </h3>
      <p className="mt-8">{post.body}</p>
      <p className="self-end mt-4 text-sm">Posted by {author.name}</p>

      <div className="border-t px-5 flex flex-col w-full mt-6">
        {postComments.data.length === 0 ? (
          <p className="self-center mt-8 text-sm">No comments yet</p>
        ) : (
          <>
            <h6 className="font-semibold my-5">Comments</h6>
            <div className="flex flex-col gap-4">
              {postComments.data.map((comment, index) => (
                <BlogCommentItem
                  key={`${index}-${comment.id}`}
                  comment={comment}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {postComments.data.length === 0 ? null : (
        <div className="flex items-center justify-between p-4 md:p-5 rounded-b text-sm w-full ">
          {shownCommentsCount === postComments.totalData ? null : (
            <button type="button" className="font-semibold hover:underline">
              Load more comments
            </button>
          )}
          <p>
            {shownCommentsCount} of {postComments.totalData} comments
          </p>
        </div>
      )}
    </main>
  );
}
