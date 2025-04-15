"use client";

import Button from "@/components/Button/page";
import Input from "@/components/Input/page";
import Modal from "@/components/Modal/page";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AccountBannedIcon } from "../../../public";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPassword() {
  const [timer, setTimer] = useState(119);
  const [isLoader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { setters } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // const formatTime = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  // const handleResend = () => {
  //   setTimer(119);
  // };

  const router = useRouter();

  const onSubmit = async (data) => {
    if (isLoader) return;

    setLoader(true);
    try {
      setters.setEmail(data.email);

      const response = await resetPassword({ username: data.email });
      console.log("response", response);
      if (
        response?.nextStep?.resetPasswordStep ===
        "CONFIRM_RESET_PASSWORD_WITH_CODE"
      ) {
        toast.success("Verification code sent to your email.");

        router.push("/change-password");
        setLoader(false);
      } else {
        toast.error("Unexpected response. Please try again.");
        setLoader(false);
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setLoader(false);

      // Handle specific Amplify or custom errors
      if (error.name === "UserNotFoundException") {
        toast.error("User not found.");
      } else if (error.name === "InvalidParameterException") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col font-[manrope] bg-zinc-900">
        <div className="p-6 bg-white">
          <h1 className="text-xl font-semibold  text-emerald-500">
            Contextufy
          </h1>{" "}
        </div>

        <div className="flex-1 bg-[#f3f6f5] flex items-center justify-center p-4">
          <div className="bg-[#FEFEFE] rounded-[20px] border border-[#CCD8D3] px-[78px] py-[48px] max-w-[560px] w-full">
            <div className="text-center">
              <h2 className="text-[32px] font-medium text-emerald-500 mb-2">
                Forgot your Password?
              </h2>
              <p className="text-[#8DA99E] text-[14px] mb-6">
                Please enter your email below and we will send you instructions
                to reset your Password
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#999999] mb-1"
                >
                  Email
                </label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="email"
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
                  <Button
                    type="submit"
                    loading={isLoader}
                    disabled={isLoader}
                    className="bg-emerald-500 hover:bg-emerald-600  !rounded-[12px] !h-[43px] text-white"
                  >
                    Send Code
                  </Button>
                </div>
              </div>

              {/* <div className="text-center text-sm text-gray-500 mt-4">
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
              </div> */}
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

      {/* <Modal
      className="!max-w-[511px] w-full px-[67px] py-[26px]"
        isOpen={isModalOpen}
        icon={AccountBannedIcon}
        title={<p className="text-[30px] font-medium leading-[166.2%]">Account Banned</p>}
        description={<p className="text-[#999999]">Your Account Has Been Permanently Banned</p>}
        actionButton={
          <Button
            onClick={() => window.open("/support", "_blank")}
            className="mt-[22px] !rounded-[10px] bg-emerald-500 px-4 py-2  max-w-[167px] text-[14px] text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Contact Support
          </Button>
        }
      >
        <p className="text-sm text-[#999999] mt-[24px]">
          If You Believe This Is A Mistake Or Would Like To Appeal The Decision,
          Please Contact Our Support Team
        </p>
      </Modal> */}
    </>
  );
}
