import { useRouter } from "next/router";
import Navbar from "@/components/NavBar";
import { useState, useEffect } from "react";
import { getPostById } from "@/utils/api";
import { TbHeartPlus, TbMessageCircle } from "react-icons/tb";

import { FaRegBookmark } from "react-icons/fa6";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState({});

  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch(() => {
        console.log("[getPostById] error:", error);
      });

    /*   getSingleProduct(id)
      .then((data) => setProduct(data))
      .catch((error) => console.log("[UseProduct] error:", error)); */
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="grid grid-cols-1 bg-gray-100 py-4 lg:grid-cols-1 xl:grid-cols-[18rem_1fr_18rem]">
        <section className="grid md:grid-cols-[4rem_1fr] lg:grid-cols-[4rem_1fr_18rem] xl:col-start-2">
          <aside className="hidden p-2 md:block">
            <ul className="mt-10 flex flex-col items-center gap-4">
              <li className="flex flex-col items-center">
                <TbHeartPlus className="text-2xl hover:text-red-500 hover:cursor-pointer" />
                <p>
                  {post.reactions?.reduce(
                    (total, reaction) => total + reaction.quantity,
                    0
                  )}
                </p>
              </li>
              <li className="flex flex-col items-center">
                <TbMessageCircle className="text-2xl hover:text-yellow-400 hover:cursor-pointer" />
                <p>{post.comments?.length}</p>
              </li>
              <li className="flex flex-col items-center">
                <FaRegBookmark className="text-2xl hover:text-blue-500 hover:cursor-pointer" />
                <p>0</p>
              </li>
            </ul>
          </aside>
          <article className="p-3">
            <div className="flex flex-col gap-2 rounded-md bg-white">
              <img
                src={post.image}
                alt="post-image"
                className="w-full rounded-t-md"
              />
              <div className="flex flex-col gap-3 px-8 py-4">
                <div className="grid grid-cols-[3rem_1fr] gap-3">
                  <img
                    src={post.user?.profilePic}
                    alt=""
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-bold">{post.user?.name}</h2>
                    <p className="text-sm text-gray-500">
                      Posted on {post.createAt}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  {post.reactions?.map((reaction) => {
                    return (
                      <span className="flex gap-1 hover:border-gra-200 rounded-md border border-white p-1 hover:cursor-pointer hover:border hover:border-gray-400 hover:bg-slate-200">
                        <img src={`/${reaction.reaction}.svg`} alt="" />
                        {reaction.quantity}
                      </span>
                    );
                  })}
                </div>
                <h1 className="text-5xl font-extrabold">{post.title}</h1>
                <div className="flex flex-row gap-3">
                  {post.tags?.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className="hover:border-gra-200 rounded-md border border-white px-2 py-1 text-sm hover:cursor-pointer hover:border hover:border-gray-400 hover:bg-slate-200"
                      >
                        #{tag}
                      </span>
                    );
                  })}
                </div>
                <p className="text-justify">{post.body}</p>
              </div>
              <hr />
              <div className="p-3">
                <h1>Comments area</h1>
              </div>
            </div>
          </article>
          <aside className="hidden p-2 lg:block">
            <section className="flex flex-col rounded-md bg-white">
              <div className="h-9 rounded-t-md bg-black"></div>
              <article className="flex flex-col gap-3 p-3">
                <div className="-mt-6 flex flex-row items-end gap-2">
                  <img
                    className="size-12 rounded-full"
                    src={post.user?.profilePic}
                    alt="Creator image"
                  />
                  <h2 className="text-lg font-bold text-slate-700">
                    {post.user?.name}
                  </h2>
                </div>
                <button className="w-full rounded-md bg-blue-800/90 p-1 text-white hover:bg-blue-800">
                  Follow
                </button>
                <p className="text-sm text-slate-500">
                  Me especializo en diseñar y construir interfaces de usuario
                  intuitivas y responsivas utilizando HTML, CSS y JavaScript
                </p>
                <div className="flex flex-col">
                  <h3 className="text-xs font-semibold">JOINED</h3>
                  <p className="text-slate-500">Feb 23, 2022</p>
                </div>
              </article>
            </section>
          </aside>
        </section>
      </main>
    </>
  );
}
