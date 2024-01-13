const BlogItemSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_el, idx) => (
        <div key={idx} className="border-t px-4 py-6 animate-pulse w-full">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2 w-full mt-6" />
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 mt-8 h-2 w-11/12" />
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 mt-8 h-2 w-5/12 mb-4" />
        </div>
      ))}
    </>
  );
};

export default BlogItemSkeleton;
