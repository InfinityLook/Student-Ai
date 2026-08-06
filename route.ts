import { NextRequest, NextResponse } from "next/server";

// Tato route mění text na přirozeně znějící řeč přes ElevenLabs.
// Bezplatný tarif ElevenLabs (~10 000 znaků/měsíc) nevyžaduje platební kartu:
// 1. Jdi na https://elevenlabs.io/app/sign-up a zaregistruj se (e-mail nebo Google)
// 2. V nastavení profilu (ikonka vlevo dole -> "API Keys") si vytvoř API klíč
// 3. Vlož ho do .env.local jako ELEVENLABS_API_KEY=tvuj_klic
//
// Volitelně můžeš nastavit i ELEVENLABS_VOICE_ID (viz knihovna hlasů na
// https://elevenlabs.io/app/voice-library - stačí zkopírovat Voice ID).
// Pokud klíč není nastavený nebo se ElevenLabs nepodaří zavolat, appka na
// klientovi automaticky přepne zpátky na hlas prohlížeče, takže se nikdy nic nerozbije.

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // "Rachel" - hezky zní i s multijazyčným modelem

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Chybí text." }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      // Klient na tohle reaguje tichým přepnutím na hlas prohlížeče
      return NextResponse.json({ error: "not_configured" }, { status: 501 });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2", // multijazyčný model umí i češtinu
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("ElevenLabs API error:", response.status, errText);
      return NextResponse.json({ error: "tts_failed" }, { status: 502 });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Kairo voice route error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
