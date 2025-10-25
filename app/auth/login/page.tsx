"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";


type FormValues = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { user, login } = useAuthStore();
    const [ isLoading, setIsLoading ] = useState(false);
    const router = useRouter();
    // ✅ Redirect only after render
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [ user, router ]);

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 1500)); // simulate loading
        login(data.email, data.password);
        setIsLoading(false);
    };

    // ✅ Login Form
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left Section */ }
            <div className="relative hidden flex-1 items-center justify-center bg-primary/10 lg:flex">
                {/*<Image*/ }
                {/*    alt="Login illustration"*/ }
                {/*    className="absolute inset-0 object-cover opacity-90"*/ }
                {/*    fill*/ }
                {/*    src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d6?auto=format&fit=crop&w=1400&q=80"*/ }
                {/*/>*/ }
                <div className="relative z-10 max-w-md rounded-2xl bg-black/40 p-8 text-left text-white backdrop-blur-sm">
                    <h1 className="mb-4 font-bold text-4xl">Welcome Back 👋</h1>
                    <p className="text-lg opacity-90">Login to continue managing your account and explore amazing features.</p>
                </div>
            </div>

            {/* Right Section (Form) */ }
            <div className="flex flex-1 items-center justify-center px-6 py-10 lg:px-12">
                <motion.div animate={ { opacity: 1, y: 0 } } className="w-full max-w-md" initial={ { opacity: 0, y: 20 } }>
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-center font-semibold text-2xl">Sign in to your account</CardTitle>
                            <CardDescription className="text-center">Enter your email and password below</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-5" onSubmit={ handleSubmit(onSubmit) }>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input autoComplete="email" disabled={ isLoading } id="email" placeholder="you@example.com" type="email" { ...register("email", { required: true }) } />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input autoComplete="current-password" disabled={ isLoading } id="password" placeholder="••••••••"
                                           type="password" { ...register("password", { required: true }) } />
                                </div>

                                <Button className="w-full" disabled={ isLoading } type="submit">
                                    { isLoading && <Spinner className="mr-2 h-4 w-4"/> }
                                    { isLoading ? "Signing in..." : "Sign In" }
                                </Button>
                            </form>

                            <p className="mt-6 text-center text-muted-foreground text-sm">
                                Don’t have an account?{ " " }
                                <Link className="text-primary hover:underline" href="/auth/register">
                                    Create one
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
