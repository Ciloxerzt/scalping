'use server'

import { openai } from '@/lib/openai';
import { createClient } from '@/lib/supabase/server';

export async function analyzeMarket() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        throw new Error('Unauthorized');
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Berikan daftar saham Bursa Efek Indonesia (BEI) yang memiliki peluang scalping tinggi hari ini (target exit 1–3 hari). Saya mau analisa teknikal terperinci untuk setiap saham: Setup entry/exit (support/resistance), Indikator (RSI, MACD, MA, Vol), Skenario Best/Worst, Stop Loss logis, Target Profit, Timeframe (5m/15m/1h), dan Alasan kuat kenapa potensial. Gaya bahasa: to the point, trader profesional, bahasa Indonesia gaul tapi tajam."
                },
                {
                    role: "user",
                    content: "SCAN MARKET NOW. Cari potensi scalping terbaik di IHSG hari ini."
                }
            ],
            model: "gpt-4-turbo-preview", // Or gpt-3.5-turbo depending on budget/availability
        });

        return { success: true, data: completion.choices[0].message.content };
    } catch (error) {
        console.error('OpenAI Error:', error);
        return { success: false, error: 'Gagal melakukan analisa pasar. Coba lagi nanti.' };
    }
}
