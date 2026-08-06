import { NextRequest, NextResponse } from "next/server";

// Tato route bere hlasový dotaz od Kaira a pošle ho na Groq API.
// Groq má zdarma API klíč bez nutnosti zadávat platební kartu:
// 1. Jdi na https://console.groq.com/keys
// 2. Zaregistruj se (stačí e-mail nebo Google účet)
// 3. Vytvoř API klíč a vlož ho do .env.local jako GROQ_API_KEY=tvuj_klic
//
// Pokud klíč není nastavený, Kairo odpoví alespoň základní hláškou,
// aby appka nespadla - hlasová navigace ("otevři úkoly" apod.) funguje
// vždy, protože tu logiku řeší KairoCommands.ts a nepotřebuje žádné API.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

const SYSTEM_PROMPT = `Jsi Kairo - přátelský studijní parťák a AI asistent uvnitř aplikace Student AI.
Mluvíš vždy česky, neformálně a stručně (maximálně 2-3 věty), protože tvoje odpovědi
se rovnou přehrávají nahlas přes hlasový syntetizátor. Pomáháš se školou, učením,
motivací a organizací studia. Buď věcný, vstřícný a povzbuzující.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Chybí zpráva." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply:
          "Tomuhle příkazu zatím nerozumím a nemám ještě nastavený AI klíč. Přidej prosím GROQ_API_KEY do souboru .env.local.",
      });
    }

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: 200,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return NextResponse.json({
        reply: "Omlouvám se, teď se mi nepodařilo připojit na server. Zkus to prosím za chvíli znovu.",
      });
    }

    const data = await response.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Nejsem si jistý, jak na to odpovědět. Zkus se zeptat jinak.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Kairo API route error:", err);
    return NextResponse.json(
      { reply: "Něco se pokazilo při zpracování tvého požadavku." },
      { status: 500 }
    );
  }
}
