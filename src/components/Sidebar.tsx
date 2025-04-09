import Link from "next/link";
import React from "react";

export const Sidebar = ({
  blogItems,
}: {
  blogItems: {
    blogId: string;
    blogTitle: string;
  }[];
}) => {
  return (
    <div className="p-4">
      <div className="w-full border-b-2 mb-2">Blog</div>
      <div className="flex flex-col space-2">
        {blogItems?.map((blogItem, index) => (
          <Link
            key={index}
            href={`/blogs/${blogItem.blogId}`}
            className="hover:text-blue-500 underline"
          >
            {blogItem.blogTitle}
          </Link>
        ))}
        <Link href={`/blogs`} className="hover:text-blue-500 underline">
          {`Create new`}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
