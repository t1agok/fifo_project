"use client";

import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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

export const RegisterForm = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema> >({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            full_name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/signup', values);
            console.log('Response data:', response.data);
    
            if (response.status === 201 && response.data.success) {
                setSuccessMessage("Registro efetuado");
                setErrorMessage("");
                router.push('/auth/login');
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
            headerLabel="Criar uma conta"
            backButtonLabel="Já possui uma conta?"
            backButtonhref="/auth/login"
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
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Nome completo"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Nome de usuário"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                        Criar uma conta
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}