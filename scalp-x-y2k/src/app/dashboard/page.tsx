'use client'

import { useState } from "react";
import { analyzeMarket } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowBigRightDash, Terminal, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleScan = async () => {
        setLoading(true);
        setResult(""); // Clear previous results

        // Simulate some "hacking" delay for effect if really fast, but OpenAI takes time anyway
        try {
            const res = await analyzeMarket();
            if (res.success && res.data) {
                setResult(res.data);
            } else {
                setResult("ERROR: CONNECTION INTERRUPTED. SYSTEM FAILURE. TRY AGAIN.");
            }
        } catch (e) {
            setResult("CRITICAL ERROR: AGENT DISCONNECTED.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-black pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-8 h-8" />
                    Command Center
                </h1>
                <Button onClick={handleLogout} className="text-xs h-8">
                    <LogOut className="w-3 h-3 mr-2" /> LOGOUT
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* CONTROL PANEL */}
                <Card className="md:col-span-1 h-fit">
                    <h2 className="font-bold text-xl mb-4 underline decoration-2 underline-offset-4">CONTROLS</h2>
                    <p className="text-sm mb-6 text-gray-600">
                        Initialize AI Agent for real-time IDX Scalping Analysis.
                    </p>

                    <Button
                        variant="market"
                        onClick={handleScan}
                        isLoading={loading}
                    >
                        {loading ? "SCANNING..." : "SCAN MARKET (IDX)"}
                    </Button>

                    <div className="mt-6 border border-black bg-gray-100 p-2 font-mono text-[10px]">
                        <p>TARGET: BURSA EFEK INDONESIA</p>
                        <p>TIMEFRAME: SCALP (1-3 DAYS)</p>
                        <p>AI MODEL: GPT-4-TURBO</p>
                        <p>STATUS: {loading ? "PROCESSING..." : "IDLE"}</p>
                    </div>
                </Card>

                {/* OUTPUT CONSOLE */}
                <Card className="md:col-span-2 min-h-[500px] flex flex-col bg-black text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full bg-y2k-silver text-black px-2 py-1 text-xs font-bold border-b border-white flex justify-between">
                        <span>TERMINAL_OUTPUT_V1</span>
                        <span>{new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="mt-8 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap h-full">
                        {loading && (
                            <div className="animate-pulse">
                                {">"} ESTABLISHING SECURE CONNECTION...<br />
                                {">"} DOWNLOADING MARKET DATA...<br />
                                {">"} ANALYZING PATTERNS...<br />
                                <span className="inline-block w-2 h-4 bg-green-500 animate-bounce ml-1"></span>
                            </div>
                        )}

                        {!loading && !result && (
                            <div className="text-gray-500">
                                {">"} SYSTEM READY.<br />
                                {">"} AWAITING COMMAND.<br />
                                <span className="animate-pulse">_</span>
                            </div>
                        )}

                        {result && (
                            <div className="text-green-400">
                                {result}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
