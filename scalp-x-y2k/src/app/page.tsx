'use client'

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) router.push('/dashboard');
        };
        checkUser();
    }, [router, supabase.auth]);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error(error);
            alert('Login Failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md bg-white">
                <div className="mb-6 flex justify-center">
                    <div className="bg-black text-white p-4 rounded-full">
                        <Lock className="w-8 h-8" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center mb-2">ACCESS REQUIRED</h1>
                <p className="text-center text-gray-500 mb-8 font-mono text-sm border-b border-black pb-4">
                    IDENTIFICATION PROTOCOL
                </p>

                <Button
                    onClick={handleLogin}
                    isLoading={isLoading}
                    className="w-full text-lg py-6"
                >
                    [ CONNECT VIA GOOGLE ]
                </Button>

                <div className="mt-4 text-[10px] text-center text-gray-400">
                    SECURE CONNECTION // 128-BIT ENCRYPTION
                </div>
            </Card>
        </div>
    );
}
