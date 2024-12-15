import { emitWarning } from "process";
import { z } from "zod";

export type FormState = {
    error?: {
        username?: string[];
        password?: string[];
    };
    message?: string;
} | undefined;

export const SignUpFormSchema = z.object({
    username: z
        .string()
        .min(2, {message: "Name must be at least 2 characters long"})
        .trim(),

    password: z
        .string()
        .min(8, {message: "password must be at least 8 characters long"})
        .trim()
})

export const LoginFormSchema = z.object({
    username: z.string().min(1, {message: "Insert a username"}),
    password: z.string().min(1 , {message: "Insert a password"})
})