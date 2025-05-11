"use client";

import { ArticleType } from "@/lib/ArticleTypes";
import { revalidateItems } from "@/lib/revalidateItems";
import Link from "next/link";
import React from "react";

export const Sidebar = ({
  blogItems,
  projectItems,
}: {
  blogItems: {
    id: string;
    title: string;
  }[];
  projectItems: {
    id: string;
    title: string;
  }[];
}) => {
  return (
    <>
      <div className="p-4">
        <div className="w-full flex justify-between border-b-2 mb-2 pb-2">
          Blogs
          <button
            onClick={() => revalidateItems(ArticleType.Blog)}
            className="px-2 border-2 active:bg-black active:text-white"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col space-2">
          {blogItems?.map((item, index) => (
            <Link
              key={index}
              href={`/blogs/${item.id}`}
              className="hover:text-blue-500 underline"
            >
              {item.title}
            </Link>
          ))}
          <Link href={`/blogs`} className="hover:text-blue-500 underline">
            {`Create new`}
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full flex justify-between border-b-2 mb-2 pb-2">
          Projects
          <button
            onClick={() => revalidateItems(ArticleType.Project)}
            className="px-2 border-2 active:bg-black active:text-white"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col space-2">
          {projectItems?.map((item, index) => (
            <Link
              key={index}
              href={`/projects/${item.id}`}
              className="hover:text-blue-500 underline"
            >
              {item.title}
            </Link>
          ))}
          <Link href={`/projects`} className="hover:text-blue-500 underline">
            {`Create new`}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
