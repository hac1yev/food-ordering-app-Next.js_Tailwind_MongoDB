"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from 'next-auth/react';

const LoginForm = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await signIn('credentials', {
            email, password,
            callbackUrl: '/'
        });

    };

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
            <input 
                type="email" 
                name="email" 
                placeholder="email" 
                value={email} 
                onChange={ev => setEmail(ev.target.value)}
            />
            <input 
                type="password" 
                name="password"
                placeholder="password"
                value={password} 
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Login</button>
            <div className="my-4 text-center text-gray-500">
                or login with provider
            </div>
            <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })} className="flex gap-4 justify-center">
                <Image src={'/google.png'} alt={''} width={24} height={24} />
                Login with google
            </button>
        </form>
    );
};

export default LoginForm;