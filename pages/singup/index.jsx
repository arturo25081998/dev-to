import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { createUser } from "@/utils/api";

export default function singUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const currentPassword = watch("password", "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      const response = await createUser(
        data.profilePic,
        data.name,
        data.email,
        data.password
      );
      if (response.success) {
        router.push("/login");
        setIsSubmitting(false);
        return;
      }

      setError("root.data", { type: "manual", message: response.message });
      setIsSubmitting(false);
    } catch (error) {
      console.log("Error in signin:", error);
      setIsSubmitting(false);
    }
  }

  const router = useRouter();
  return (
    <main className="flex flex-col items-center p-10 bg-white h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-3 rounded-md border px-4 py-6 md:w-[35rem]"
      >
        <h1 className="text-lg font-bold">Create your account</h1>
        <div className="flex flex-col gap-1">
          <p className="w-full text-left font-semibold">Profile image</p>
          <input
            type="text"
            className={clsx("w-full rounded-md border border-gray-200 p-2", {
              "bg-red-500/10 border-red-500": errors.profilePic,
            })}
            {...register("profilePic", {
              required: "Profile image is required",
            })}
          />
        </div>
        {errors.profilePic && (
          <span className="text-red-500">{errors.profilePic.message}</span>
        )}
        <div className="flex flex-col gap-1">
          <p className="w-full text-left font-semibold">
            Name <span className=" text-red-500">*</span>
          </p>
          <input
            type="text"
            className={clsx("w-full rounded-md border border-gray-200 p-2", {
              "bg-red-500/10 border-red-500": errors.name,
            })}
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 4,
                message: "Name need to be bigger than 4 characters.",
              },
              maxLength: {
                value: 50,
                message: "Name need to be shorter than 50 characters.",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="w-full text-left font-semibold">
            Email <span className=" text-red-500">*</span>
          </p>
          <input
            type="text"
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
          <p className="w-full text-left font-semibold">
            Password <span className=" text-red-500">*</span>
          </p>
          <input
            type="password"
            className={clsx("w-full rounded-md border border-gray-200 p-2", {
              "bg-red-500/10 border-red-500": errors.password,
            })}
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
        <div className="flex flex-col gap-1">
          <p className="w-full text-left font-semibold">
            Password Confirmation <span className=" text-red-500">*</span>
          </p>
          <input
            type="password"
            className={clsx("w-full rounded-md border border-gray-200 p-2", {
              "bg-red-500/10 border-red-500": errors.confirmation,
            })}
            disabled={isSubmitting}
            {...register("confirmation", {
              validate: {
                value: (value) =>
                  value === currentPassword ||
                  "Password confirmation does not match",
              },
              required: {
                value: true,
                message: "Password confirmation is required",
              },
            })}
          />
          {errors.confirmation && (
            <span className="text-red-500">{errors.confirmation.message}</span>
          )}
        </div>

        <button
          className="w-24 rounded-md bg-blue-800/90 p-2 text-white hover:bg-blue-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading ..." : "Sing Up"}
        </button>
        {errors.root?.data && (
          <span className="p-2 rounded w-full bg-red-500/15 text-sm text-red-500">
            {errors.root.data.message}
          </span>
        )}
      </form>
    </main>
  );
}
