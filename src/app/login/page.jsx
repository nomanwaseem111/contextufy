"use client";
import Button from "@/components/Button/page";
import React, { useState } from "react";
import { FacebookIcon, GoogleIcon } from "../../../public";
import Input from "@/components/Input/page";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { resendSignUpCode, signIn } from "aws-amplify/auth";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [isLoader, setIsLoader] = useState(false);
  const { actions } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (isLoader) return;
    setIsLoader(true);
    try {
      const res = await signIn({
        username: data?.email,
        password: data?.password,
      });

      console.log("res", res);

      if (res.isSignedIn) {
        await actions.fetchAuthData();
        setIsLoader(false);
        toast.success("You are successfully logged in");
      } else if (res?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({ username: data?.email });
        setters.setEmailVerifyModalOpen(true);
        // navigate("/email-verify", { state: { email: getValues()?.email } });
        setters.setEmail(getValues()?.email);

        setIsLoader(false);
        return;
      } else {
        toast.error("incorrect email or password");
      }
    } catch (error) {
      setIsLoader(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex-1 flex h-screen items-center justify-center p-4 ">
      <div className="w-full max-w-[500px] bg-white font-[manrope]  border border-[#CCD8D3] rounded-[20px]  p-6 md:p-8">
        <h2 className="text-[22px] sm:text-[36px]  lg:text-[36px]  font-[400] text-center text-[#25c791] mb-6">
          Welcome Back!
        </h2>

        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter Email Address"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter Password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <div className="flex justify-end items-center">
            <Link
              href="/forgot-password"
              className="text-[#25C791] text-sm font-normal hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          <Button
            loading={isLoader}
            type="submit"
            className="h-[46px] !bg-[#25C791] !rounded-[12px]"
            disabled={isLoader}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <hr className="text-[#E3EAE8]" />
            <p className="text-sm text-[#BABABA] w-[40%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white">
              Or Sign Up With
            </p>
          </div>
          <div className="mt-[27px] space-y-2">
            <Button
              icon={GoogleIcon}
              className="w-full flex font-[inter] text-[14px] h-[43px] items-center justify-center gap-2 bg-white !text-[#000000] py-2 px-4 border border-gray-300 !rounded-[12px] hover:bg-gray-50 transition-colors"
            >
              Continue With Google
            </Button>
            <Button
              icon={FacebookIcon}
              className="w-full flex font-[inter] text-[14px] h-[43px] items-center justify-center gap-2 bg-white !text-[#000000] py-2 px-4 border border-gray-300 !rounded-[12px] hover:bg-gray-50 transition-colors"
            >
              Continue With Facebook
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-[#8e8e93]">
            Don't have an account?
            <Link
              href="/register"
              className="text-[#25c791] font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>{" "}
    </div>
  );
}
