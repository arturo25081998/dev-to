import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { createPost } from "@/utils/api";

import { userLogged } from "@/hooks";

export default function CreatePost() {
  const user = userLogged();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(data) {
    setIsSubmitting(true);
    const tags = ["JS", "HTML"];
    const token = localStorage.getItem("token");
    try {
      const response = await createPost(
        data.title,
        data.postImage,
        data.body,
        tags,
        token
      );
      if (response.success) {
        router.push("/");
        setIsSubmitting(false);
        return;
      }

      setError("root.data", { type: "manual", message: response.message });
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error in post registration:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid grid-cols-1 bg-gray-100 py-1 xl:grid-cols-[18rem_1fr_18rem] gap-5">
      <div className="flex justify-between p-2 xl:col-start-2">
        <div className="flex items-center gap-2">
          <img
            src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            className="w-12"
            alt=""
          />
          <h2 className="font-semibold">Create post</h2>
        </div>
        <Link
          href="/"
          className="rounded-md p-2 text-sm font-bold text-gray-500 hover:bg-blue-700/10 hover:text-blue-700"
        >
          ✕
        </Link>
      </div>
      <section className="flex flex-col gap-4 p-2 xl:col-start-2">
        <article className="rounded-md bg-white px-7 py-4">
          <form
            id="myForm"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <input
              type="text"
              className={clsx("w-full p-2 outline-none", {
                "bg-red-500/10": errors.postImage,
              })}
              placeholder="Post image"
              {...register("postImage", {
                required: "Post image required",
              })}
            />
            <div className="flex flex-col gap-3 p-2 md:flex-row">
              <div className="flex gap-3">
                <p className="rounded-md bg-gray-100 p-1">
                  <span className="text-gray-400"># JS</span>
                  <button className="ml-1">✕</button>
                </p>
                <p className="rounded-md bg-gray-100 p-1">
                  <span className="text-gray-400"># JS</span>
                  <button className="ml-1">✕</button>
                </p>
              </div>
              <input
                type="text"
                className="outline-none"
                placeholder="Add another..."
              />
            </div>
            <input
              type="text"
              className={clsx("w-full p-2 text-4xl font-bold outline-none", {
                "bg-red-500/10": errors.title,
              })}
              placeholder="New post title here..."
              {...register("title", {
                required: {
                  value: true,
                  message: "Post title is required",
                },
                minLength: {
                  value: 2,
                  message: "Post title too short",
                },
                maxLength: {
                  value: 100,
                  message: "Post title too long",
                },
              })}
            />
            <textarea
              className={clsx("w-full border-0 border-none p-2 outline-none", {
                "bg-red-500/10": errors.body,
              })}
              rows="10"
              placeholder="Write your post content here..."
              {...register("body", {
                required: {
                  value: true,
                  message: "Post body is required",
                },
                minLength: {
                  value: 15,
                  message: "Body too short",
                },
              })}
            ></textarea>
            <div className="flex flex-row gap-3">
              <button
                disabled={isSubmitting}
                className="rounded-md bg-blue-700/90 p-2 font-semibold text-white hover:bg-blue-700"
              >
                Publish
              </button>
              <Link
                href="/"
                className="rounded-md p-2 text-gray-500 hover:bg-blue-700/10 hover:text-blue-700"
              >
                Save draft
              </Link>
              <Link
                href="/"
                className="rounded-md p-2 text-sm text-gray-500 hover:bg-blue-700/10 hover:text-blue-700"
              >
                Revert changes
              </Link>
            </div>
            {errors.root?.data && (
              <span className="p-2 rounded w-full bg-red-500/15 text-sm text-red-500">
                {errors.root.data.message}
              </span>
            )}
          </form>
        </article>
      </section>
    </main>
  );
}
