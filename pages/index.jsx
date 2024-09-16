import Navbar from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/utils/api";
import { userLogged } from "@/hooks";
import Logincard from "@/components/LoginCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sortedByReactions, sortedByDate } from "@/utils/utils";
import SideBarButton from "@/components/SideBarButton";
import sideBarButtons from "@/collections/sideBarButtons.json";
import otherButtons from "@/collections/otherButtons.json";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithub,
  FaInstagramSquare,
  FaTwitch,
} from "react-icons/fa";

export default function Home() {
  const user = userLogged();

  const [posts, setPosts] = useState([]);

  function setTopPosts() {
    const data = [...posts];
    const sortedPosts = sortedByReactions(data);
    setPosts(sortedPosts);
  }

  function setLatestPosts() {
    const data = [...posts];
    const sortedPosts = sortedByDate(data);
    setPosts(sortedPosts);
  }

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        //setPosts(data)
        const sortedPosts = sortedByDate(data);
        setPosts(sortedPosts);
      })
      .catch((error) => console.log(error));
  }, []);
  //console.log(user);

  return (
    <>
      <Navbar />
      <main className=" grid grid-cols-1 2xl:grid-cols-[18rem_1fr_18rem] py-4">
        <section className="grid xl:col-start-2 md:grid-cols-[15rem_1fr] lg:grid-cols-[1fr_35rem_1fr] xl:grid-cols-[15rem_1fr_23rem]">
          <aside className="p-3 hidden md:flex flex-col gap-2">
            {!user && <Logincard />}

            <div className="flex flex-col gap-1">
              {sideBarButtons.map((button) => {
                const imageUrl = button.split(" ").join("_");
                return (
                  <SideBarButton
                    key={button}
                    image={`/${imageUrl}.svg`}
                    text={button}
                  ></SideBarButton>
                );
              })}
            </div>
            <p className="font-semibold px-2">Other </p>
            {otherButtons.map((button) => {
              const imageUrl = button.split(" ").join("_");
              return (
                <SideBarButton
                  key={button}
                  image={`/${imageUrl}.svg`}
                  text={button}
                ></SideBarButton>
              );
            })}

            <div className="flex flex-row px-2 gap-1">
              <Link
                className="text-2xl p-2 hover:text-blue-600 rounded-md hover:bg-blue-600/10"
                href="/"
              >
                <FaFacebookSquare />
              </Link>
              <Link
                className="text-2xl p-2 hover:text-blue-600 rounded-md hover:bg-blue-600/10"
                href="/"
              >
                <FaTwitterSquare />
              </Link>
              <Link
                className="text-2xl  p-2 hover:text-blue-600 rounded-md hover:bg-blue-600/10"
                href="/"
              >
                <FaGithub />
              </Link>
              <Link
                className="text-2xl  p-2 hover:text-blue-600 rounded-md hover:bg-blue-600/10"
                href="/"
              >
                <FaInstagramSquare />
              </Link>
              <Link
                className="text-2xl  p-2 hover:text-blue-600 rounded-md hover:bg-blue-600/10"
                href="/"
              >
                <FaTwitch />
              </Link>
            </div>
          </aside>
          <section className="flex flex-col gap-4 w-full p-2">
            <div className="flex gap-3">
              <button className="hover:text-blue-700 hover:bg-white p-2 rounded-md">
                Relevant
              </button>
              <button
                onClick={setLatestPosts}
                className="hover:text-blue-700 hover:bg-white p-2 rounded-md"
              >
                latest
              </button>
              <button
                className="hover:text-blue-700 hover:bg-white p-2 rounded-md"
                onClick={setTopPosts}
              >
                Top
              </button>
            </div>
            {posts?.map((post, idx) => {
              //console.log(idx);
              return (
                <PostCard
                  imageHide={idx == 0 ? false : true}
                  key={post._id}
                  title={post.title}
                  image={post.image}
                  tags={post.tags}
                  reactions={post.reactions}
                  comments={post.comments}
                  user={post.user}
                  date={post.updatedAt}
                  id={post._id}
                />
              );
            })}
          </section>
          <aside className="p-2 hidden lg:block">
            <div className="w-full bg-white flex flex-col gap-3 rounded-md">
              <ul className="w-full">
                <li className="flex flex-col gap-2 p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    #discuss
                  </h2>
                  <p className="text-gray-500 text-xs ">
                    Discussion threads targeting the whole community{" "}
                  </p>
                </li>
                <li className="flex flex-col gap-2 p-4 border-t-[0.1rem]">
                  <h3 className="hover:text-blue-600 hover:cursor-pointer">
                    How do you raise funds for an open-source project?{" "}
                  </h3>
                  <p className="font-light text-sm text-gray-500">7 comments</p>
                </li>
                <li className="flex flex-col gap-2 p-4 border-t-[0.1rem]">
                  <h3 className="hover:text-blue-600 hover:cursor-pointer">
                    How do you raise funds for an open-source project?{" "}
                  </h3>
                  <p className="font-light text-sm text-gray-500">7 comments</p>
                </li>
                <li className="flex flex-col gap-2 p-4 border-t-[0.1rem]">
                  <h3 className="hover:text-blue-600 hover:cursor-pointer">
                    How do you raise funds for an open-source project?{" "}
                  </h3>
                  <p className="font-light text-sm text-gray-500">7 comments</p>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
/*
// static site generation
export async function getStaticProps() {
  console.log("getStaticProps");
  const posts = await getAllPosts();
  // console.log(posts);
  return {
    props: { posts },
    revalidate: 60,
  };
}
*/

//Server side rendering
export async function getServerSideProps() {
  return {
    props: {},
  };
}
