import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { getUserById, login } from "@/utils/api";
import LoginButton from "@/components/LoginButton";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebookSquare, FaGithub } from "react-icons/fa";
import socialNetworks from "@/collections/socialNetworks.json";

export default function loginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const iconMapper = {
    FaApple: FaApple,
    FaFacebookSquare: FaFacebookSquare,
    FaGithub: FaGithub,
    FcGoogle: FcGoogle,
    FaXTwitter: FaXTwitter,
  };

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const token = await login(data.email, data.password);
      if (token) {
        //alert("valid credential");
        localStorage.setItem("token", token.token);
        const user = await getUserById(token.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("profilePic", user.profilePic);
        localStorage.setItem("joinedAt", user.createAt);
        router.push("/");
        setIsSubmitting(false);
        return;
      }

      setError("root.data", { type: "manual", message: "Invalid credentials" });
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error in login:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex flex-col items-center bg-white">
      <section className="flex w-full flex-col gap-5 p-4 md:w-[35rem]">
        <div className="flex w-full justify-center py-3">
          <img
            src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png"
            alt=""
            className="w-16"
          />
        </div>
        <h1 className="text-center text-2xl font-bold">
          Join the DEV community
        </h1>
        <p className="text-center">
          DEV Community is a community of 2,023,033 amazing developers
        </p>
        {socialNetworks.map((socialNetwork) => {
          const IconComponent = iconMapper[socialNetwork.icon];
          return (
            <LoginButton
              socialNetwork={socialNetwork.name}
              Icon={IconComponent}
              key={socialNetwork.name}
            />
          );
        })}

        <p className="text-center">OR</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <p className="w-full text-left font-semibold">Email</p>
            <input
              type="text"
              placeholder="Enter your email"
              className={clsx("w-full rounded-md border border-gray-200 p-2", {
                "bg-red-500/10 border-red-500": errors.email,
              })}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="w-full text-left font-semibold">Password</p>
            <input
              type="password"
              className={clsx("w-full rounded-md border border-gray-200 p-2", {
                "bg-red-500/10 border-red-500": errors.password,
              })}
              placeholder="Enter your password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex flex-row justify-between py-2">
            <div className="flex flex-row gap-2">
              <input type="checkbox" name="" id="" />
              <p>Remember me</p>
            </div>
            <a href="">Forgot password?</a>
          </div>
          <button
            className={clsx(
              "w-full rounded-md bg-blue-800/90 hover:bg-blue-800 p-2 text-white",
              {
                "bg-gray-300": isSubmitting,
              }
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading ..." : "Login"}
          </button>
          {errors.root?.data && (
            <span className="p-2 rounded w-full bg-red-500/15 text-sm text-red-500">
              {errors.root.data.message}
            </span>
          )}
        </form>
        <p className="text-center text-sm">
          By signing in, you are agreeing to our privacy policy, terms of use
          and code of conduct.
        </p>
        <hr />
        <p className="text-center">
          New to DEV Community?{" "}
          <span className="text-blue-600">Create Account</span>
        </p>
      </section>
    </main>
  );
}
