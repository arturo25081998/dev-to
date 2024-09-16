import Link from "next/link";

export default function Logincard() {
  return (
    <div className="w-full p-3 bg-white flex flex-col gap-3 rounded-md">
      <h1 className="font-bold text-xl">
        DEV Community is a community of 2,015,351 amazing developers
      </h1>
      <p className="text-gray-600">
        Were a place where coders share, stay up-to-date and grow their careers.
      </p>
      <Link
        href="/singup"
        className="text-center whitespace-nowrap rounded-lg border border-blue-600 p-2 font-light hover:bg-blue-600 hover:text-white hover:underline text-blue-600"
      >
        Create account
      </Link>
      <Link
        href="/login"
        className="text-center rounded-lg p-2 font-light hover:bg-blue-600/10 hover:text-blue-600 hover:underline md:block"
      >
        Login
      </Link>
    </div>
  );
}
