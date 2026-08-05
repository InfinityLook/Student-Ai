"use client";

import { useState } from "react";
import { executeKairoCommand } from "./KairoCommands";


export default function KairoVoice() {

  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");


  const startListening = () => {

    if (typeof window === "undefined") return;


    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;



    if (!SpeechRecognition) {

      alert(
        "Hlasové ovládání není v tomto prohlížeči podporováno."
      );

      return;

    }



    const recognition =
      new SpeechRecognition();



    recognition.lang = "cs-CZ";
    recognition.continuous = false;
    recognition.interimResults = false;



    recognition.onstart = () => {

      setListening(true);

    };



    recognition.onend = () => {

      setListening(false);

    };



    recognition.onerror = () => {

      setListening(false);

    };



    recognition.onresult = (event: any) => {


      const result =
        event.results[0][0].transcript;



      setText(result);


      executeKairoCommand(result);


    };



    recognition.start();


  };



  return (

    <div className="mt-4">


      <button

        onClick={startListening}

        className="
          px-5
          py-3
          rounded-2xl
          bg-cyan-500/20
          border
          border-cyan-400/30
          text-cyan-300
          hover:bg-cyan-500/30
          transition
        "

      >

        {
          listening
          ?
          "🎧 Poslouchám..."
          :
          "🎙️ Mluvit s Kairem"
        }


      </button>



      {
        text && (

          <div className="
            mt-3
            text-sm
            text-gray-400
          ">

            <span>
              Kairo slyšel:
            </span>

            <br/>

            {text}

          </div>

        )
      }


    </div>

  );

}
