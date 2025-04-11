"use client";

import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FacebookIcon, GoogleIcon } from "../../../public";
import Link from "next/link";
import Modal from "@/components/Modal/page";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    <div className="min-h-screen flex flex-col">
      <header className="p-4  bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold font-[manrope] text-emerald-500">
            Contextufy
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-[#f3f6f5]">
        <div className="w-full max-w-[500px] bg-white font-[manrope] rounded-[20px] border border-[#CCD8D3] p-6 md:p-8">
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
              <Link
                href="/login"
                className="text-[#25c791] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* <Modal
        className="!max-w-[560px] w-full text-emerald-500 px-[78px] py-[40px]"
        isOpen={isModalOpen}
        title={
          <p className="text-[28px] leading-[166.2%]">
            Password Reset Successfully!
          </p>
        }
        description={
          <p className="max-w-[291px] text-[#8DA99E] text-[14px] mt-[12px] w-full">
            Your Password has been successfully updated. you can now sign in
            using your new password.
          </p>
        }
        actionButton={
          <Button
            onClick={() => window.open("/support", "_blank")}
            className="!rounded-[10px] bg-emerald-500 px-4 py-2 mt-[36px] !max-w-[405px] h-[46px] text-[18px] text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Sign In
          </Button>
        }
      ></Modal> */}

      <Modal
        className="!max-w-[560px] w-full text-emerald-500 px-[78px] py-[55px] !rounded-[20px]"
        isOpen={isModalOpen}
        title={
          <p className="text-[26px] leading-[166.2%]">
            Registration Successful!
          </p>
        }
        description={
          <p className=" text-[#8DA99E] text-[14px] mt-[12px] w-full">
            Congratulations! you are successfully registered to Contextufy
          </p>
        }
      ></Modal>

      <footer className="p-4 font-[inter] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Community Standards
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Feedback
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
}
