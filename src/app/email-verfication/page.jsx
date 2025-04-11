"use client";

import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EmailVerification() {
  const [timer, setTimer] = useState(119);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResend = () => {
    setTimer(119);
  };

  const onSubmit = async (data) => {
    console.log(data);
    reset();
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
                  loading={loading}
                  disabled={loading}
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
                <Button
                  type="button"
                  onClick={handleResend}
                  className="!text-emerald-500 hover:bg-white bg-white font-medium"
                  disabled={timer > 0 && timer < 119}
                >
                  Resend
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
