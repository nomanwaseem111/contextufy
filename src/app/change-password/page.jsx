"use client";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import React, { useState } from "react";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ChangPassword = () => {
  const router = useRouter();
  const [isLoader, setLoader] = useState(false);
  const { states } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
      confirmPassword: "",
      newPassword: "",
    },
  });
  const onSubmit = async (data) => {
    setLoader(true);
    console.log("data", data);
    try {
      const { code, newPassword, confirmPassword } = data;

      // // Check if passwords match
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      // Check if the email was previously submitted and code was sent
      const response = await confirmResetPassword({
        username: states?.email,
        confirmationCode: code,
        newPassword: newPassword,
      });
      console.log("response", response);
      toast.success("Password reset successfully!");
      reset();
      router.push("/login");
      setLoader(false);
    } catch (error) {
      console.error("Reset error:", error);
      setLoader(false);
    }
  };

  return (
    <div className=" flex-1 flex h-screen items-center justify-center p-4 ">
      <div className="w-full max-w-[500px] bg-white font-[manrope]  border border-[#CCD8D3] rounded-[20px]  p-6 md:p-8">
        <h1 className="text-[22px] sm:text-[36px] lg:text-[36px]  font-[400] text-center text-[#25c791] mb-6">
          {" "}
          Create New Password
        </h1>
        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="code"
            type="number"
            label="Confirm Code"
            placeholder="Enter Code"
            error={errors.code?.message}
            className={`flex-1 border-gray-300 ${
              errors.code ? "border-red-500" : ""
            }`}
            {...register("code", {
              required: "code is required",
              minLength: {
                value: 6,
                message: "code must be at least 6 digits",
              },
              maxLength: {
                value: 6,
                message: "code must be at most 6 digits",
              },
            })}
            onInput={(e) => {
              if (e.target.value.length > 6) {
                e.target.value = e.target.value.slice(0, 6);
              }
            }}
          />

          <Input
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter Your  Password Here"
            error={errors.newPassword?.message}
            name="password"
            {...register("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Input
            id="password"
            label="Confirm Password"
            type="password"
            placeholder="Enter Your  Password Here"
            error={errors.confirmPassword?.message}
            name="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Button
            type="submit"
            disabled={isLoader}
            loading={isLoader}
            className="h-[46px] !bg-[#25C791] !rounded-[12px]"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangPassword;
