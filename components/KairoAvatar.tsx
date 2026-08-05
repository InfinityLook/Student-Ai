"use client";

import { useEffect, useState } from "react";
import KairoVoice from "./kairo/KairoVoice";

const messages = [
  "Ahoj! Jsem Kairo, tvůj studijní parťák. Pomůžu ti zvládnout dnešní učení 🚀",
  "Vítej zpět! Podíváme se spolu, co dnes potřebuješ udělat?",
  "Jsem připravený ti pomoct s učením, testy i plánováním 📚",
  "Každý malý krok tě posouvá dál. Začneme spolu?"
];


export default function KairoAvatar() {


  const [message,setMessage] = useState("");



  useEffect(()=>{

    const random =
      messages[
        Math.floor(
          Math.random()*messages.length
        )
      ];


    setMessage(random);


  },[]);



  return (

    <div className="
      flex
      items-center
      gap-5
    ">


      {/* AVATAR */}

      <div className="
        relative
        w-24
        h-24
        rounded-full
        bg-gradient-to-br
        from-cyan-400
        to-blue-600
        flex
        items-center
        justify-center
        shadow-xl
        animate-pulse
      ">

        <span className="
          text-5xl
        ">
          🤖
        </span>


      </div>




      {/* CHAT */}

      <div className="
        flex-1
      ">


        <h3 className="
          text-xl
          font-bold
          text-cyan-400
        ">
          Kairo
        </h3>


        <div className="
          mt-2
          bg-white/10
          border
          border-white/10
          rounded-2xl
          p-4
          text-gray-200
        ">

          {message}


        </div>



        <button

          className="
            mt-3
            px-5
            py-2
            rounded-xl
            bg-cyan-500/20
            border
            border-cyan-400/30
            text-cyan-300
            hover:bg-cyan-500/30
            transition
          "

        >

          🎙️ Mluvit s Kairem

        </button>
        <KairoVoice />



      </div>



    </div>


  );

}
