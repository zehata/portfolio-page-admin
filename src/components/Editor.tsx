"use client";
import React, { ImgHTMLAttributes } from "react";
import classNames from "classnames";
import { dragAndDropUpload } from "@/lib/dragAndDropUpload";
import Markdown from "react-markdown";
import { debounce } from "lodash";

export const Editor = ({
  databaseArticle,
  saveArticle,
  deleteArticle,
  buttonLabel,
}: {
  databaseArticle: {
    title: string;
    content: string;
    slug: string;
  };
  saveArticle: ({
    title,
    content,
    slug,
  }: {
    title: string;
    content: string;
    slug: string;
  }) => Promise<void>;
  deleteArticle?: () => void;
  buttonLabel: string;
}) => {
  const [article, setArticle] = React.useState<{
    title: string;
    content: string;
    slug: string;
  }>(databaseArticle);

  const [articlePreview, setArticlePreview] = React.useState<{
    title: string;
    content: string;
    slug: string;
  }>(databaseArticle);

  const renderPreview = React.useMemo(
    () =>
      debounce((article: { title: string; content: string; slug: string }) => {
        setArticlePreview(article);
      }, 1000),
    [],
  );

  const [dragging, setDraggingOver] = React.useState<boolean>(false);

  const handleFileDrop = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setDraggingOver(false);
    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item) => {
        if (item.kind != "file") return;
        const file = item.getAsFile();
        if (!file) return;
        const form = new FormData();
        form.append("file", file);
        dragAndDropUpload(form).then(
          (filename) => {
            console.log(filename)
          },
          (reason) => {
            console.log(reason);
          },
        );
      });
    }
  };

  const textarea = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    renderPreview(article);
    if (article === databaseArticle) return;
    window.addEventListener("beforeunload", (event) => event.preventDefault());

    return () => {
      window.removeEventListener("beforeunload", (event) =>
        event.preventDefault(),
      );
    };
  }, [renderPreview, article, databaseArticle]);

  const customImage = (img: ImgHTMLAttributes<HTMLImageElement>) => {
    const src = img.src;
    const alt = img.alt;
    if (typeof src === "object") return <img src={src} alt={alt} />;
    if (!src) return <img alt={alt} />;
    const params = new URL(src).searchParams;
    const width = params.get("width");
    const height = params.get("height");
    if (!width || !height) return <img alt={alt} src={src} />;
    return <img alt={alt} width={width} height={height} src={src} />;
  };

  const [writing, setWriting] = React.useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
      <button
        className="w-md border-2 active:bg-black active:text-white"
        onClick={() => {
          setWriting(true);
          saveArticle({
            title: article.title,
            content: article.content,
            slug: article.slug,
          }).then(() => setWriting(false));
        }}
      >
        {buttonLabel}
      </button>
      {deleteArticle ? (
        <button
          className="w-md border-2 active:bg-black active:text-white"
          onClick={() => {
            setWriting(true);
            deleteArticle();
          }}
        >
          {`Delete`}
        </button>
      ) : (
        <></>
      )}
      <div className="w-full">
        <h1>{`Title`}</h1>
        <input
          className="border-2"
          value={article.title}
          onChange={(event) => {
            if (!article) return;
            setArticle({
              ...article,
              title: event.target.value,
            });
          }}
        ></input>
      </div>
      <div className="w-full">
        <h1>{`Slug`}</h1>
        <input
          className="border-2"
          value={article.slug}
          onChange={(event) => {
            if (!article) return;
            setArticle({
              ...article,
              slug: event.target.value,
            });
          }}
        ></input>
      </div>
      <div className="w-full">
        <h1>{`Content`}</h1>
        <div
          className="relative w-fit h-fit"
          onDragOver={(event) => {
            event.stopPropagation();
            event.preventDefault();
            if (dragging) return;
            setDraggingOver(true);
          }}
          onDrop={handleFileDrop}
        >
          <textarea
            ref={textarea}
            rows={40}
            cols={100}
            className="resize border-2"
            value={article?.content}
            onChange={(event) => {
              if (!article) return;
              setArticle({
                ...article,
                content: event.target.value,
              });
            }}
            onDrop={handleFileDrop}
          ></textarea>
          <div
            className={classNames(
              "absolute top-0 left-0 w-full h-full p-4 rounded-3xl z-1",
              {
                ["hidden"]: !dragging,
                ["block"]: dragging,
              },
            )}
            onDrop={handleFileDrop}
            onDragLeave={() => {
              setDraggingOver(false);
            }}
          >
            <div className="absolute w-full h-full backdrop-blur-sm p-4 -z-1">
              <div className="absolute bg-blue-300 w-full h-full top-0 left-0 opacity-50 rounded-3xl"></div>
              <span className="relative z-1">Upload</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1>{`Preview`}</h1>
        <div className="editor-preview w-full border-2">
          <Markdown components={{ img: customImage }}>
            {articlePreview.content}
          </Markdown>
        </div>
      </div>
      {writing ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-2 opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 flex items-center gap-2">
            <div className="w-4 h-4 border-2 mask-[conic-gradient(#000_0,#000_75%,#0000_75%,#0000_100%)] animate-spin rounded-full"></div>
            {`Writing to database`}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Editor;
