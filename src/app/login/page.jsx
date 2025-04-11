'use client'
import Button from '@/components/Button/page'
import React from 'react'
import { FacebookIcon, GoogleIcon } from '../../../public'
import Input from '@/components/Input/page'
import Link from 'next/link'
import { useForm } from "react-hook-form";

export default function LoginForm() {
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

  const onSubmit = (data1) =>{
console.log('data1',data1);
reset()

  } 
  return (
    <div className=' flex-1 flex h-screen items-center justify-center p-4 '>
      <div className="w-full max-w-[500px] bg-white font-[manrope]  border border-[#CCD8D3] rounded-[20px]  p-6 md:p-8">
        <h2 className="text-[22px] sm:text-[36px]  lg:text-[36px]  font-[400] text-center text-[#25c791] mb-6">
          Welcome Back!
        </h2>

        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)} >

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
         <div className='flex justify-end items-center'>
           
            <Link href="/forgot-password" className='text-[#25C791] text-sm font-normal hover:underline'>
              Forget Password?
            </Link>
          </div>

          <Button
            // loading={loading}
            type="submit"
            className="h-[46px] !bg-[#25C791] !rounded-[12px]"
          // disabled={loading}
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
            <Link href="/register" className="text-[#25c791] font-semibold hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div> </div>
  )
}


