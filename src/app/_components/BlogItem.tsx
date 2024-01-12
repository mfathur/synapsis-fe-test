import Link from "next/link";

type Props = {
  blog: Blog;
};

const BlogItem = ({ blog }: Props) => {
  return (
    <div className="border-t px-4 py-6">
      <Link href={`/blogs/${blog.id}`}>
        <p className="text-primary-dark font-bold cursor-pointer hover:underline">
          {blog.title}
        </p>
      </Link>
      <p className="mt-4">{blog.body.slice(0, 200)}...</p>
    </div>
  );
};

export default BlogItem;
