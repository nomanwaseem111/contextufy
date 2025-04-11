"use client";

import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FacebookIcon, GoogleIcon } from "../../../public";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    setLoading(false);

    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-[500px] bg-white font-[manrope] rounded-[20px]  p-6 md:p-8">
      <h2 className="text-[22px] sm:text-[32px] lg:text-[36px]  font-medium text-center text-[#25c791] mb-6">
        Register Your Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="Enter Full Name"
          error={errors.fullName?.message}
          name="fullName"
          {...register("fullName", {
            required: "Full name is required",
          })}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter Email Address"
          error={errors.email?.message}
          name="email"
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
          name="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <Input
          id="agreeToTerms"
          type="checkbox"
          label={
            <>
              Agree to our{" "}
              <a
                href="#"
                className="text-[#25c791] font-semibold font-[inter] hover:underline"
              >
                Terms & Conditions
              </a>
            </>
          }
          error={errors.agreeToTerms?.message}
          {...register("agreeToTerms", {
            required: "You must agree to the terms and conditions",
          })}
        />

        <Button
          loading={loading}
          type="submit"
          className="h-[46px]"
          disabled={loading}
        >
          Register
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
          Already have an account?{" "}
          <a href="#" className="text-[#25c791] font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
