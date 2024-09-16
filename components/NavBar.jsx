import { HiMagnifyingGlass } from "react-icons/hi2";
import Link from "next/link";
import { userLogged } from "@/hooks";
import LogoutButton from "./LogoutButton";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export default function Navbar() {
  const user = userLogged();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  function onSubmit(data) {
    alert(data.search);
  }

  return (
    <nav className="bg-white grid grid-cols-1 p-2 md:grid-cols-1 2xl:grid-cols-[18rem_1fr_18rem] ">
      <div className="grid grid-cols-2 lg:grid-cols-[5rem_1fr_1fr] 2xl:col-start-2">
        <Link href="/">
          <img
            className="w-12"
            src="https://media.dev.to/cdn-cgi/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            alt=""
          />
        </Link>
        <form className=" hidden lg:block" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={clsx(
              "hidden w-full grid-cols-[2.5rem_1fr_8rem] items-center rounded-lg border border-gray-400 bg-white hover:border-blue-600 lg:grid",
              {
                "border-red-500 hover:border-red-500": errors.search,
              }
            )}
          >
            <button className="h-full hover:bg-blue-600/10 text-[1.5rem] p-1 font-bold rounded-md flex justify-center items-center">
              <HiMagnifyingGlass />
            </button>
            <input
              type="text"
              className="h-full max-w-7xl border-none p-2 outline-none"
              placeholder="Find related post..."
              {...register("search", {
                required: true,
              })}
            />
            <p className="text-sm text-gray-500">Power by Agolia</p>
          </div>
        </form>
        <div className="flex flex-row items-center justify-end gap-2">
          <a
            href=""
            className="block text-[1.7rem] rounded-lg p-2 font-light hover:bg-blue-600/10 hover:text-blue-600 hover:underline md:hidden"
          >
            <HiMagnifyingGlass />
          </a>
          {!user && (
            <>
              <Link
                href="/login"
                className="hidden rounded-lg p-2 font-light hover:bg-blue-600/10 hover:text-blue-600 hover:underline md:block"
              >
                Login
              </Link>
              <Link
                href="/singup"
                className="whitespace-nowrap rounded-lg border border-blue-600 p-2 font-light hover:bg-blue-600 hover:text-white hover:underline text-blue-600"
              >
                Create account
              </Link>
            </>
          )}
          {user && (
            <>
              <LogoutButton />
              <Link
                href="/post/create"
                className="whitespace-nowrap rounded-lg border border-blue-600 p-2 font-light hover:bg-blue-600 hover:text-white hover:underline text-blue-600"
              >
                Create post
              </Link>
              <img
                src={localStorage.getItem("profilePic")}
                alt="profile-puc-user"
                className=" size-10 rounded-full"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
