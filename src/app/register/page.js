"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [responseMsg,setResponseMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/register", {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()
        
        setResponseMsg(data.message);

        setEmail('');
        setPassword('');
        
    };  

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">Register</h1>
            {responseMsg.length > 0 && <p className="text-center mt-4">{responseMsg}</p>}
            <form className="block max-w-sm mx-auto my-4" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })} className="flex gap-4 justify-center">
                    <Image src={"/google.png"} alt="" width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    );
};

export default RegisterPage;