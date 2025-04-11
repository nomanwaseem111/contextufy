'use client'
import { useForm } from "react-hook-form";
import Button from '@/components/Button/page'
import Input from '@/components/Input/page'
import React from 'react'

const ChangPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
     code:'',
      ConfirmPassword: "",
      NewPassword: "",
    
    },
  });
  const onSubmit =(data)=>{
    console.log('data2',data);
    reset()
  }
  return (
    <div className=' flex-1 flex h-screen items-center justify-center p-4 '>
      <div className='w-full max-w-[500px] bg-white font-[manrope]  border border-[#CCD8D3] rounded-[20px]  p-6 md:p-8'>
        <h1 className='text-[22px] sm:text-[36px] lg:text-[36px]  font-[400] text-center text-[#25c791] mb-6'>  Create New Password</h1>
        <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)} >
        <Input
         id="code"
         type="number"
         label='Confirm Code'
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
          error={errors.NewPassword?.message}
          name="password"
          {...register("NewPassword", {
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
          error={errors.ConfirmPassword?.message}
          name="password"
          {...register("ConfirmPassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
         <Button
           
            type="submit"
            className="h-[46px] !bg-[#25C791] !rounded-[12px]"
          >
            Submit
          </Button>
          </form> 
      </div>
    </div>
  )
}

export default ChangPassword
