"use client";

import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { useAuth } from '../context/auth-context';
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import axios from "axios";

export const LoginForm = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();

    const form = useForm<z.infer<typeof LoginSchema> >({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', values);
            console.log('Response data:', response.data);
    
            if (response.status === 200 && response.data.success) {
                setSuccessMessage("Login efetuado");
                setErrorMessage("");
                setIsAuthenticated(true)
                router.push('/dashboard');
            } else {
                setErrorMessage(response.data.message);
                setSuccessMessage("");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Axios specific error handling
                if (error.response) {
                    setErrorMessage(error.response.data.message || "Erro ao efetuar login");
                } else if (error.request) {
                    setErrorMessage("No response from server. Please try again later.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            } else {
                // Generic error handling
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setSuccessMessage(""); // Clear any previous success message
        }
    }

    return (
        <CardWrapper
            headerLabel="Entrar"
            backButtonLabel="Não possui uma conta?"
            backButtonhref="/auth/register"
            //showSocial
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="usuario@email.com.br"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={errorMessage}/>
                    <FormSuccess message={successMessage}/>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}