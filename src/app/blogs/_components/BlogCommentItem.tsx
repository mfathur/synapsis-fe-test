import React from "react";

type Props = {
  comment: BlogComment;
};

const BlogCommentItem = ({ comment }: Props) => {
  return (
    <div>
      <p>
        {comment.body}{" "}
        <span className="text-primary-dark">~{comment.name}</span>
      </p>
    </div>
  );
};

export default BlogCommentItem;
