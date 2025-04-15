"use client";

import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { autoSignIn, confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function EmailVerification() {
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const { states, actions } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  // const onSubmit = async (data) => {
  //   console.log(data);
  //   reset();
  // };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const onSubmit = async (data) => {
    setIsLoader(true);
    try {
      const response = await confirmSignUp({
        username: states?.email,
        confirmationCode: data?.code,
      });
      console.log("confirmSignUp", response);
      if (response?.isSignUpComplete) {
        await autoSignIn();
        await actions.fetchAuthData();
        setIsLoader(false);
        toast.success("You are successfully logged in");
        router.push("/");
      }
    } catch (error) {
      console.error("confirmSignUp", error);
      toast.error(
        "Invalid verification code provided, please try again.",
        error.message
      );
      setIsLoader(false);
    }
  };

  

  const handleResend = async () => {
    setResendLoader(true);
    try {
      const response = await resendSignUpCode({
        username: states?.email,
      });
      console.log("response",response);
      toast.success("Verification code resent successfully!");
      setTimer(60); // restart timer
    } catch (error) {
      console.error("Resend Error:", error);
      toast.error("Failed to resend code: " + error.message);
    } finally {
      setResendLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-[manrope] bg-zinc-900">
      <div className="p-6 bg-white">
        <h1 className="text-xl font-semibold  text-emerald-500">Contextufy</h1>{" "}
      </div>

      <div className="flex-1 bg-[#f3f6f5] flex items-center justify-center p-4">
        <div className="bg-[#FEFEFE] rounded-[20px] border border-[#CCD8D3] px-[78px] py-[48px] max-w-[560px] w-full">
          <div className="text-center">
            <h2 className="text-[32px] font-medium text-emerald-500 mb-2">
              Email Verification
            </h2>
            <p className="text-[#8DA99E] text-[18px] mb-6">
              Check your inbox for the verification code.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="code"
                className="block text-sm text-gray-600 mb-1"
              >
                Verification code
              </label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="number"
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
                <Button
                  type="submit"
                  loading={isLoader}
                  disabled={isLoader}
                  className="bg-emerald-500 hover:bg-emerald-600 max-w-[125px] !rounded-[12px] !h-[43px] text-white"
                >
                  Confirm
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>
                If you do not receive the email use the Button below to resend
                verification code
              </p>
              <div className="mt-2">
                {/* <Button
                  type="button"
                  onClick={handleResend}
                  className="!text-emerald-500 hover:bg-white bg-white font-medium"
                  // disabled={timer > 0 && timer < 119}
                >
                  Resend
                </Button> */}
                <Button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoader || timer > 0}
                  className="!text-emerald-500 hover:bg-white bg-white font-medium"
                >
                  {resendLoader
                    ? "Sending..."
                    : timer > 0
                    ? `Resend Code`
                    : "Resend Code"}
                </Button>
                <p className="mt-1">{formatTime(timer)}</p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white p-4 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-900">
            Community Standards
          </a>
          <a href="#" className="hover:text-gray-900">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-900">
            Feedback
          </a>
          <a href="#" className="hover:text-gray-900">
            Help
          </a>
        </div>
      </div>
    </div>
  );
}
