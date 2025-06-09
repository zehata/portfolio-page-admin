"use client";
import React, { ImgHTMLAttributes } from "react";
import classNames from "classnames";
import Markdown from "react-markdown";
import { debounce, isEqual } from "lodash";
import Mousetrap from "mousetrap";
import { upload } from "@/lib/upload";

const preventEventDefault = (event: Event) => event.preventDefault();

export const Editor = ({
  databaseArticle,
  saveArticle,
  revalidateArticle,
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
  revalidateArticle?: () => Promise<void>;
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

  const handleUploadResult = React.useCallback((filename: string) => {
    if (!textarea.current) return;
    const cursorStartPosition = textarea.current.selectionStart;
    const cursorEndPosition = textarea.current.selectionEnd;
    setArticle((article) => {
      return {
        ...article,
        content: `${article.content.slice(0, cursorStartPosition)}![alt text](${filename})${article.content.slice(cursorEndPosition)}`,
      };
    });
  }, []);

  const handlePaste = React.useCallback(() => {
    navigator.clipboard.read().then((clipboardContent) => {
      clipboardContent.map((item) => {
        for (const mimeType of item.types) {
          if (mimeType.split("/")[0] === "image") {
            const imageType = mimeType.split("/")[1];
            const imageArrayBuffer = item
              .getType(mimeType)
              .then((blob) => blob.arrayBuffer());
            const fileExtension = imageType === "svg+xml" ? "svg" : imageType;
            imageArrayBuffer
              .then((arrayBuffer) =>
                upload(mimeType, fileExtension, arrayBuffer).catch((e) => {
                  return Promise.reject(e);
                }),
              )
              .then(handleUploadResult, () =>
                alert("Upload failed. Check image size"),
              );
            break;
          }
        }
      });
    });
  }, [handleUploadResult]);

  const handleFileDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
      setDraggingOver(false);
      if (event.dataTransfer.items) {
        [...event.dataTransfer.items].forEach((item) => {
          if (item.kind != "file") return;
          const file = item.getAsFile();
          if (!file) return;
          file
            .arrayBuffer()
            .then((arrayBuffer) => {
              const filenameArray = file.name.split(".");
              const fileExtension = filenameArray[filenameArray.length - 1];
              return upload(file.type, fileExtension, arrayBuffer).catch(
                (e) => {
                  return Promise.reject(e);
                },
              );
            })
            .then(handleUploadResult, () =>
              alert("Upload failed. Check image size"),
            );
        });
      }
    },
    [handleUploadResult],
  );

  const textarea = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    renderPreview(article);
    if (isEqual(article, databaseArticle)) return;
    window.addEventListener("beforeunload", preventEventDefault);

    return () => {
      window.removeEventListener("beforeunload", preventEventDefault);
    };
  }, [renderPreview, article, databaseArticle]);

  const customImage = (img: ImgHTMLAttributes<HTMLImageElement>) => {
    const src = img.src;
    const alt = img.alt;
    if (typeof src === "object") return <img src={src} alt={alt} />;
    if (!src) return <img alt={alt} />;
    const url = URL.parse(src);
    if (!url) return <img src={src} alt={alt} />;
    const params = url.searchParams;
    const width = params.get("width");
    const height = params.get("height");
    return (
      <img
        alt={alt}
        width={width ? width : "auto"}
        height={height ? height : "auto"}
        src={src}
      />
    );
  };

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const handleRefresh = React.useCallback(() => {
    if (!revalidateArticle) return;
    setRefreshing(true);
    revalidateArticle().then(() => setRefreshing(false));
  }, [revalidateArticle]);

  const [writing, setWriting] = React.useState<boolean>(false);
  const handleSave = React.useCallback(() => {
    setWriting(true);
    saveArticle({
      title: article.title,
      content: article.content,
      slug: article.slug,
    }).then(() => setWriting(false));
  }, [setWriting, saveArticle, article]);

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    Mousetrap.bind("ctrl+v", handlePaste);
    Mousetrap.bind("ctrl+s", (event) => {
      event.preventDefault();
      handleSave();
    });
    return () => {
      Mousetrap.unbind("ctrl+v");
      Mousetrap.unbind("ctrl+s");
    };
  }, [handlePaste, handleSave]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto p-4">
      <div className="flex gap-4">
        <button
          className="w-md border-2 active:bg-black active:text-white"
          onClick={handleSave}
        >
          {buttonLabel}
        </button>
        {writing ? (
          <div className="flex justify-center items-center gap-2">
            <div className="w-4 h-4 border-2 mask-[conic-gradient(#000_0,#000_75%,#0000_75%,#0000_100%)] animate-spin rounded-full"></div>
            {`Writing to database`}
          </div>
        ) : (
          <></>
        )}
      </div>
      {revalidateArticle ? (
        <div className="flex gap-4">
          <button
            className="w-md border-2 active:bg-black active:text-white"
            onClick={handleRefresh}
          >
            Refresh
          </button>
          {refreshing ? (
            <div className="flex justify-center items-center gap-2">
              <div className="w-4 h-4 border-2 mask-[conic-gradient(#000_0,#000_75%,#0000_75%,#0000_100%)] animate-spin rounded-full"></div>
              {`Refreshing`}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {deleteArticle ? (
        <button
          className="w-md border-2 active:bg-black active:text-white"
          onClick={() => {
            setConfirmDeleteDialogOpen(true);
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
      <div className="flex justify-start items-start gap-2">
        <div>
          <h1>{`Content`}</h1>
          <div
            className="relative w-full h-fit"
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
              className="mousetrap w-full resize border-2 text-lg"
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
              <div className="relative w-full h-full backdrop-blur-sm p-4 -z-1">
                <div className="absolute bg-blue-300 w-full h-full top-0 left-0 opacity-50 rounded-3xl"></div>
                <span className="relative z-1">Upload</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h1>{`Preview`}</h1>
          <div className="editor-preview border-2 whitespace-pre-wrap">
            <Markdown components={{ img: customImage }}>
              {articlePreview.content}
              
            </Markdown>
          </div>
        </div>
        {confirmDeleteDialogOpen ? (
          <div className="fixed top-0 left-0 w-full h-full z-2 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white p-4 flex flex-col items-center gap-4">
              {`Delete this article?`}
              <div className="flex gap-4">
                <button
                  className="w-30 border-2 bg-red-500 text-white active:bg-white active:text-red-500"
                  onClick={deleteArticle}
                >
                  Delete article
                </button>
                <button
                  className="w-30 border-2 active:bg-black active:text-white"
                  onClick={() => setConfirmDeleteDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Editor;
