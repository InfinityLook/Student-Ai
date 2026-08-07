import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "Chybí GROQ API klíč v nastavení Vercelu" }, { status: 500 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", 
        messages: [
          {
            role: "system",
            content: `Jsi Kairo, 3D robůtek a chytrý studijní asistent. 
            Tvé vlastnosti:
            - Jsi přátelský, trpělivý a občas přidáš jemný vtip.
            - Mluvíš přirozeně, srozumitelně a česky.
            - Jsi konstruktivní – místo pouhého dodání řešení se snažíš studenta navést, aby na to přišel sám (pokud je to vhodné).
            - Tvé odpovědi by měly být relativně stručné, aby se daly snadno poslouchat hlasovým výstupem (max 3-4 věty).`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error?.message || "Chyba při komunikaci s API");
    }

    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chyba API Kairo:", error);
    return NextResponse.json({ reply: "Promiň, moje obvody jsou teď nějaké zmatené. Zkus to za chvíli." }, { status: 500 });
  }
}
