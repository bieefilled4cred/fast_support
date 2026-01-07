"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .transform((val) => val.replace(/\s/g, "").trim())
    .pipe(z.string().email()),
  password: z
    .string({ message: "Password is required" })
    .transform((val) => val.trim())
    .pipe(z.string().min(1)),
});

export const LoginValidation = () =>
  useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
