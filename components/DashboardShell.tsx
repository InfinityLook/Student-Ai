"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { getLevelInfo } from "@/lib/gamification";

import NotificationSystem from "@/components/NotificationSystem";
import ProfileModule from "@/components/modules/ProfileModule";
import MenuHubModule from "@/components/modules/MenuHubModule";
import ShopModule from "@/components/modules/ShopModule";
import FileSystemModule from "@/components/modules/FileSystemModule";
import FlashcardsModule from "@/components/modules/FlashcardsModule";
import AITestModule from "@/components/modules/AITestModule";
import FocusTimerModule from "@/components/modules/FocusTimerModule";
import StudyLibrary from "@/components/StudyLibrary";
import KairoAvatar from "@/components/KairoAvatar";


const SUB_MODULE_IDS = [
  "shop",
  "timer",
  "files",
  "flashcards",
  "test",
  "knihovna"
];


export default function DashboardShell() {

  const {
    activeModule,
    setActiveModule,
    totalCreditsEarned
  } = useStore();


  const { level } = getLevelInfo(totalCreditsEarned);

  const isSubModule = SUB_MODULE_IDS.includes(activeModule);



  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-gray-950
      to-black
      text-white
      flex
      flex-col
    ">


      <NotificationSystem />


      {/* HEADER */}

      <header className="
        sticky
        top-0
        z-30
        backdrop-blur-xl
        bg-white/5
        border-b
        border-white/10
        px-6
        py-4
        flex
        justify-between
        items-center
      ">

        <div>

          <h1 className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            bg-clip-text
            text-transparent
          ">
            Student AI
          </h1>


          <p className="text-sm text-gray-400">
            Level {level} • Tvůj AI studijní parťák
          </p>

        </div>


        <div className="
          w-12
          h-12
          rounded-2xl
          bg-white/10
          flex
          items-center
          justify-center
          shadow-lg
        ">
          <span className="text-2xl">
            🤖
          </span>
        </div>


      </header>



      {/* KAIRO */}

      {activeModule === "profile" && (

        <section className="
          px-6
          pt-6
        ">

          <div className="
            rounded-3xl
            bg-white/5
            border
            border-white/10
            p-5
            backdrop-blur-xl
          ">

            <KairoAvatar />

          </div>

        </section>

      )}




      {/* CONTENT */}

      <main className="
        flex-1
        pb-24
        px-4
        md:px-6
        pt-4
      ">


        {activeModule === "profile" && <ProfileModule />}

        {activeModule === "settings" &&
          <div className="
            rounded-3xl
            bg-white/5
            border
            border-white/10
            p-6
          ">

            <h2 className="text-2xl font-bold">
              ⚙️ Nastavení
            </h2>

            <p className="text-gray-400 mt-2">
              Nastavení aplikace a účtu.
            </p>

          </div>
        }


        {activeModule === "menu" && <MenuHubModule />}
        {activeModule === "shop" && <ShopModule />}
        {activeModule === "timer" && <FocusTimerModule />}
        {activeModule === "files" && <FileSystemModule />}
        {activeModule === "flashcards" && <FlashcardsModule />}
        {activeModule === "test" && <AITestModule />}
        {activeModule === "knihovna" && <StudyLibrary />}


      </main>




      {/* MOBILE NAV */}

      <nav className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        backdrop-blur-xl
        bg-black/60
        border-t
        border-white/10
        py-3
        px-5
        flex
        justify-around
      ">


        {[
          ["profile","🏠","Domů"],
          ["menu","▦","Menu"],
          ["knihovna","📚","Knihy"],
          ["settings","⚙️","Nastavení"]

        ].map(([id,icon,label])=>(


          <button
            key={id}
            onClick={()=>setActiveModule(id)}
            className={`
              flex
              flex-col
              items-center
              gap-1
              text-xs
              transition
              ${
                activeModule===id
                ?
                "text-cyan-400 scale-110"
                :
                "text-gray-400"
              }
            `}
          >

            <span className="text-xl">
              {icon}
            </span>

            {label}

          </button>


        ))}


      </nav>


    </div>

  );
}
