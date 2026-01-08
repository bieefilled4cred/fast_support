"use client";
import {
  forgotPasswordSchema,
  ForgotPasswordValidation,
} from "@/app/schemas/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutateData } from "@/hooks/use-mutate-data";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

const ForgotPasswordClient = () => {
  const router = useRouter();
  const form = ForgotPasswordValidation();

  const { mutate, isPending: isInitiatingReset } = useMutateData(
    "forgot-password",
    () => {
      toast.success("Reset code sent! Please check your email.");
      router.push("/verify-code"); // Adjust route as needed, assuming verify-code
    },
    (error) => {
      console.log(error);
      const errorMessage =
        error?.response?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  );

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    mutate({
      url: "/api/forgot-password", // Assuming this endpoint based on login pattern
      payload: values,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen lg:bg-primary bg-white max-h-screen gap-4 font-inter ">
      <div className="bg-white max-h-full h-full hidden md:block">
        <div className="h-full md:flex flex-col justify-center items-center">
          <Image
            src="/illustrations/forgot-password/forgot-password.svg"
            alt="forgot password screen"
            width={500}
            height={550}
            className="-translate-y-[50px]"
          />
        </div>
        <div className="font-inter text-center -translate-y-[150%]">
          <h4 className="font-inter text-center text-[#0284B2]   text-[30px] font-bold mb-[13px]">
            Forgot Password
          </h4>
          <p className="w-[300px] mx-auto font-inter font-semi-boold text-[18px] text-[#0284B2]">
            It sucks to hear that you forgot your password. Kindly follow these
            steps to reset your password
          </p>
        </div>
      </div>
      <div className=" text-center flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[500px] w-[70%] my-auto mx-auto">
          <div className="mb-[50px] relative w-full">
            <Image
              src="/logo-text.svg"
              alt="credlanche logo"
              height={55}
              width={180}
              className="mx-auto lg:invert lg:brightness-0"
            />
          </div>

          <div className="relative  w-full">
            <h3 className="lg:text-white text-primary text-[30px] font-bold">
              Enter your email address to receive a password reset code
            </h3>

            {form.formState.errors.root && (
              <div className="bg-red-100 text-red-700 rounded px-4 py-2 my-4 text-sm">
                {form.formState.errors.root.message}
              </div>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mt-[48px] text-left"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="font-inter mb-[24px]">
                      <FormControl>
                        <div className="relative">
                          <Mail
                            size={18}
                            className="absolute left-[15px] top-1/2 -translate-y-1/2 cursor-pointer lg:text-gray-200 text-[#A9A9A9]"
                          />
                          <Input
                            placeholder="Enter email"
                            className="pl-[42px] font-medium lg:text-gray-200 text-[#A9A9A9] h-[56px] rounded-[4px] border border-[#D3D3D3] focus-visible:ring-[1px] placeholder:text-gray-200 focus-visible:ring-[#0284B2]"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  isLoading={isInitiatingReset}
                  className="w-full lg:bg-white bg-primary lg:hover:bg-gray-200 lg:hover:text-primary/80 text-center h-[50px] mt-[15px] font-inter font-bold rounded-[4px] lg:text-[#0284B2] text-white hover:text-white"
                >
                  Send Reset Code
                </Button>

                <div className="my-[16px] text-center">
                  <Link
                    href="/login"
                    className="lg:text-white text-primary cursor-pointer lg:hover:text-gray-200 hover:text-primary/80 font-medium text-[14px] text-right"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordClient;
