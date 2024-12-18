import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(1, {
        message: "Necessário informar a senha"
    }),
});

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "usuário inválido"
    }),
    email: z.string().email({
        message: "Email inválido"
    }),
    password: z.string().min(6, {
        message: "Mínimo 6 caracteres"
    }),
    full_name: z.string().min(1, {
        message: "Preencha o nome completo"
    }),
});