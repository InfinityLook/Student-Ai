"use client";

import { useState } from "react";
import { executeKairoCommand } from "./KairoCommands";


export default function KairoVoice() {


  const [listening,setListening] = useState(false);
  const [text,setText] = useState("");



  const startListening = () => {


    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;



    if(!SpeechRecognition){

      alert(
        "Tento prohlížeč nepodporuje hlasové ovládání."
      );

      return;

    }



    const recognition =
      new SpeechRecognition();



    recognition.lang = "cs-CZ";

    recognition.continuous = false;



    recognition.onstart = ()=>{

      setListening(true);

    };



    recognition.onend = ()=>{

      setListening(false);

    };



    recognition.onresult = (event:any)=>{


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
        transition
        "

      >

        {listening
        ?
        "🎧 Poslouchám..."
        :
        "🎙️ Mluvit s Kairem"
        }


      </button>



      {
        text &&
        <p className="mt-3 text-gray-400">

          Slyšel jsem:
          <br/>
          {text}

        </p>
      }


    </div>

  );


}
