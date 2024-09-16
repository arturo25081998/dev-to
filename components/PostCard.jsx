import { TbMessageCircle } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa6";
import Image from "next/image";
import ReactionsImage from "@/components/ReactionsImage";
import Link from "next/link";
import clsx from "clsx";

export default function PostCard({
  title,
  image,
  tags,
  reactions,
  comments,
  user,
  date,
  id,
  imageHide,
}) {
  const totalReactions = reactions.reduce(
    (total, reaction) => total + reaction.quantity,
    0
  );

  return (
    <article className="w-full flex flex-col gap-2 bg-white rounded-md pb-2">
      <img
        src={image}
        alt="post-image"
        className={clsx("rounded-t-md", {
          hidden: imageHide,
        })}
      />
      <div
        id="post-user-info"
        className="grid grid-cols-[3rem_1fr] items-center px-3 py-2"
      >
        <img
          src={user.profilePic}
          alt="user-post-image"
          className=" size-10 rounded-full"
        />
        <div className="">
          <h2 className="">{user.name}</h2>
          <p className="font-light text-sm">{date}</p>
        </div>
      </div>
      <Link href={`/${id}`} className="font-bold text-xl px-3">
        {title}
      </Link>
      <div className="px-3 flex flex-row gap-2">
        {tags.map((tag, idx) => {
          return (
            <span
              key={`${tag}-${idx}`}
              className="hover:cursor-pointer text-sm text-gray-600 py-1 border border-white px-2 hover:bg-gray-400/30 rounded-md hover:border-gray-400"
            >
              # {tag}
            </span>
          );
        })}
      </div>
      <div className="px-3.5 py-2 flex flex-row justify-between">
        <div className="flex flex-row gap-1">
          <div className="py-1 px-3 hover:bg-gray-100 flex flex-row rounded-md items-center">
            <div className="flex">
              {reactions.map((reaction, idx) => {
                const zContent = (idx + 1) * 10;

                // console.log(zContent);
                return (
                  <ReactionsImage
                    reaction={reaction.reaction}
                    toLeft={zContent == 10 ? false : true}
                    zIndex={zContent}
                    key={`${reaction.reaction}-${idx}`}
                  />
                );
              })}
            </div>
            <p className="pl-2 text-sm inline-flex">
              {totalReactions}
              <span className=" hidden sm:block pl-1">Reactions</span>
            </p>
          </div>
          <div className="py-1 px-3 hover:bg-gray-100 flex flex-row rounded-md items-center">
            <TbMessageCircle />
            <p className="pl-2 text-sm inline-flex">
              {comments.length}
              <span className=" hidden sm:block pl-1"> Comments</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <p className="text-gray-500 py-1 px-3 text-xs flex flex-row items-center">
            4 min read
          </p>
          <p className="hover:bg-blue-600/10 flex flex-row text-xl items-center p-3 rounded-md hover:cursor-pointer">
            <FaRegBookmark />
          </p>
        </div>
      </div>
    </article>
  );
}
