"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import * as React from "react";
import { useForm } from "react-hook-form";


type FormValues = {
    name?: string;
    email: string;
    password: string;
};

export default function AuthPage() {
    const [ mode, setMode ] = React.useState<"login" | "register">("login");
    const { user, login, register: registerUser, logout } = useAuthStore();
    const { register, handleSubmit, reset } = useForm<FormValues>();
    const [ isLoading, setIsLoading ] = React.useState(false);

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1000)); // simulate delay
        if (mode === "login") login(data.email, data.password);
        else registerUser(data.name ?? "", data.email, data.password);
        setIsLoading(false);
        reset();
    };

    // ✅ When user logged in
    if (user) {
        return (
            <motion.div animate={ { opacity: 1, y: 0 } } className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-background p-6"
                        initial={ { opacity: 0, y: 20 } }>
                <Card className="w-full max-w-md p-6 shadow-xl backdrop-blur-md">
                    <CardTitle className="mb-4 text-center font-bold text-2xl">Welcome, { user.name } 🎉</CardTitle>
                    <p className="mb-6 text-center text-muted-foreground">You’re logged in successfully.</p>
                    <Button className="w-full" onClick={ logout } variant="destructive">
                        Logout
                    </Button>
                </Card>
            </motion.div>
        );
    }

    // ✅ Login & Register Layout
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left Side (Image) */ }
            <div className="relative hidden flex-1 items-center justify-center overflow-hidden bg-primary/10 p-10 lg:flex">

                {/*<Image*/ }
                {/*    alt="Login illustration dark"*/ }
                {/*    className="hidden object-cover opacity-90 dark:block"*/ }
                {/*    fill*/ }
                {/*    priority*/ }
                {/*    src="https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1280&q=80"*/ }
                {/*/>*/ }
                {/*<Image*/ }
                {/*    alt="Login illustration"*/ }
                {/*    className="rounded-lg object-cover" // ✅ must start with "/"*/ }
                {/*    height={ 100 } // ✅ define width*/ }
                {/*    src="/my-logo-sq.png" // ✅ define height*/ }
                {/*    width={ 100 }*/ }
                {/*/>*/ }
                <div className="relative z-10 max-w-md rounded-2xl bg-black/30 p-6 text-left text-white backdrop-blur-sm">
                    <h1 className="mb-4 font-bold text-4xl">{ mode === "login" ? "Welcome Back 👋" : "Join Us Today 🚀" }</h1>
                    <p className="text-gray-200 text-lg">
                        { mode === "login" ? "Log in to access your dashboard and continue where you left off." : "Create your account to explore all the new features waiting for you." }
                    </p>
                </div>
            </div>

            {/* Right Side (Form) */ }
            <div className="flex flex-1 items-center justify-center bg-background px-6 py-10 lg:px-12">
                <Card className="w-full max-w-md border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center font-semibold text-2xl">{ mode === "login" ? "Sign in to your account" : "Create your account" }</CardTitle>
                        <CardDescription className="text-center">{ mode === "login" ? "Enter your credentials below to sign in" : "Fill in your details to register a new account" }</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-5" onSubmit={ handleSubmit(onSubmit) }>
                            { mode === "register" && (
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input disabled={ isLoading } id="name" placeholder="Your Name" { ...register("name", { required: mode === "register" }) } />
                                </div>
                            ) }

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input autoComplete="email" disabled={ isLoading } id="email" placeholder="you@example.com" type="email" { ...register("email", { required: true }) } />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input autoComplete="current-password" disabled={ isLoading } id="password" placeholder="••••••••" type="password" { ...register("password", { required: true }) } />
                            </div>

                            <Button className="w-full" disabled={ isLoading } type="submit">
                                { isLoading && <Spinner className="mr-2 h-4 w-4"/> }
                                { isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Sign Up" }
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-muted-foreground text-sm">
                            { mode === "login" ? "Don’t have an account?" : "Already have an account?" }{ " " }
                            <button className="text-primary hover:underline" onClick={ () => setMode(mode === "login" ? "register" : "login") } type="button">
                                { mode === "login" ? "Create one" : "Sign in" }
                            </button>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
