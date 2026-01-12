"use client";
import { loginSchema, LoginValidation } from "@/app/schemas/loginSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useLoginMutation } from "@/app/query-options/authenticationQueryOption";
import { useUserStore } from "@/app/store/userStore";
import { APIError, LoginResponse } from "@/app/types";

const LoginClient = () => {
  const [passwordType, setPasswordType] = useState("password");
  const form = LoginValidation();
  const router = useRouter();
  const { mutate: loginMutation, isPending: isLoading } = useLoginMutation();
  const setUser = useUserStore((state) => state.setUser);

  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      return setPasswordType("text");
    }
    return setPasswordType("password");
  };

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    form.clearErrors();

    const trimmedValues = {
      username: values.username.replace(/\s/g, "").trim(),
      password: values.password.trim(),
    };

    loginMutation(trimmedValues, {
      onSuccess: (data: LoginResponse) => {
        toast.success("Login successful! Welcome back.");
        

        setUser({
          email: trimmedValues.username,
          password: trimmedValues.password,
          roles: data.roles,
          isNewUser: data.isNewUser,
          message: data.message,
        });

        if (data.isNewUser || data.status === "Temporary") {
          router.replace("/dashboard");
          return;
        }

        if (data.apps && data.apps.length > 0) {
          const firstApp = data.apps[0];
          if (firstApp.url) {
            window.location.href = firstApp.url;
            return;
          }
        }

        router.replace("/dashboard");
      },
      onError: (error: APIError) => {
        const errorMessage =
          error.response?.message ||
          error.message ||
          "Something went wrong. Please try again.";

        form.setError("root", {
          type: "manual",
          message: errorMessage,
        });
        form.setError("password", {
          type: "manual",
          message: errorMessage,
        });
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen lg:bg-primary font-inter overflow-hidden">
      <div className="bg-white h-full hidden md:block overflow-hidden">
        <div className="h-full md:flex flex-col justify-center items-center">
          <Image
            src="/illustrations/login/login.svg"
            alt="login screen"
            width={500}
            height={550}
            className="-translate-y-[50px]"
          />
        </div>
        <div className="font-inter text-center -translate-y-[170%]">
          <h4 className="font-inter text-center text-[#0284B2] text-[30px] font-bold mb-[13px] mt-4">
            Welcome Back!
          </h4>
          <p className="font-inter text-[18px] text-[#0284B2]">
            We are delighted to have you back.
          </p>
          <p className="w-[260px] mx-auto font-inter text-[18px] text-[#0284B2]">
            Kindly login into your account to stay connected.
          </p>
        </div>
      </div>
      {/* Login Form section */}
      <div className=" text-center flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-[500px] w-[70%] my-auto mx-auto">
          <div className="mb-[50px] relative w-full">
            <Image
              src="/logo-text.svg"
              alt="credlanche logo"
              height={55}
              width={180}
              className="mx-auto lg:brightness-0 lg:invert"
            />
          </div>

          <div className="relative font-inter w-full">
            <h3 className="lg:text-white text-primary text-[30px] font-bold">
              Login into your account
            </h3>
          </div>
          {/* form section*/}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full mt-[48px] text-left"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="font-inter mb-[24px]">
                    <FormControl>
                      <div className="relative w-full">
                        <Mail
                          size={18}
                          className="absolute left-[15px] top-1/2 -translate-y-1/2 cursor-pointer lg:text-gray-200 text-[#A9A9A9]"
                        />
                        <Input
                          placeholder="Enter your email address"
                          className="pl-[42px] font-medium lg:text-gray-200 text-[#A9A9A9] h-[56px] rounded-[4px] border border-[#D3D3D3] focus-visible:ring-[1px] placeholder:text-gray-200 focus-visible:ring-[#0284B2]"
                          {...field}
                          onChange={(e) => {
                            const valueWithoutSpaces = e.target.value.replace(
                              /\s/g,
                              ""
                            );
                            field.onChange(valueWithoutSpaces);
                          }}
                          onBlur={(e) => {
                            const trimmedValue = e.target.value
                              .replace(/\s/g, "")
                              .trim();
                            field.onChange(trimmedValue);
                            field.onBlur();
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedText = e.clipboardData
                              .getData("text")
                              .replace(/\s/g, "")
                              .trim();
                            field.onChange(pastedText);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="font-inter">
                    <FormControl>
                      <div className="relative w-full">
                        <Lock
                          size={18}
                          className="absolute left-[15px] top-1/2 -translate-y-1/2 cursor-pointer lg:text-gray-200 text-[#A9A9A9]"
                        />
                        <Input
                          placeholder="Enter your password"
                          className="h-[56px] font-medium pl-[42px] lg:text-gray-200 text-[#A9A9A9] rounded-[4px] border border-[#D3D3D3] focus-visible:ring placeholder:text-gray-200 focus-visible:ring-[#0284B2]"
                          type={passwordType}
                          {...field}
                          onBlur={(e) => {
                            const trimmedValue = e.target.value.trim();
                            field.onChange(trimmedValue);
                            field.onBlur();
                          }}
                          onPaste={(e) => {
                            e.preventDefault();
                            const pastedText = e.clipboardData
                              .getData("text")
                              .trim();
                            field.onChange(pastedText);
                          }}
                        />
                        {passwordType === "password" ? (
                          <Eye
                            size={20}
                            className="absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer lg:text-gray-200 text-[#A9A9A9]"
                            onClick={() => togglePasswordVisibility()}
                          />
                        ) : (
                          <EyeOff
                            size={20}
                            className="absolute right-[15px] top-1/2 -translate-y-1/2 cursor-pointer lg:text-gray-200 text-[#A9A9A9]"
                            onClick={() => togglePasswordVisibility()}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="my-[16px] text-right">
                <Link
                  href="/forgot-password"
                  className="lg:text-gray-200 text-[#A9A9A9] cursor-pointer  text-[14px] text-right hover:text-gray-200/80"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="default"
                isLoading={isLoading}
                className="w-full text-center h-[50px] mt-[15px] font-inter font-bold rounded-[4px] lg:bg-white bg-primary  lg:hover:bg-gray-200! lg:hover:shadow  hover:bg-primary/80 hover:text-white cursor-pointer text-white lg:text-[#0284B2] lg:hover:text-primary"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
