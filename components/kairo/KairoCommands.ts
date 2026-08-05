import { useStore } from "@/store/useStore";


export function executeKairoCommand(
  command: string
) {


  const text =
    command.toLowerCase();



  const {
    setActiveModule
  } = useStore.getState();



  if (
    text.includes("flash") ||
    text.includes("kartič")
  ) {

    setActiveModule("flashcards");

    speak(
      "Otevírám tvoje flashcards."
    );

    return;

  }



  if (
    text.includes("test")
  ) {

    setActiveModule("test");

    speak(
      "Otevírám AI test."
    );

    return;

  }



  if (
    text.includes("knih")
  ) {

    setActiveModule("knihovna");

    speak(
      "Otevírám studijní knihovnu."
    );

    return;

  }



  if (
    text.includes("nastavení")
  ) {

    setActiveModule("settings");

    speak(
      "Otevírám nastavení."
    );

    return;

  }



  if (
    text.includes("profil") ||
    text.includes("domů")
  ) {

    setActiveModule("profile");

    speak(
      "Otevírám profil."
    );

    return;

  }



  speak(
    "Tomuto příkazu zatím nerozumím."
  );


}



function speak(
  text:string
) {


  if(
    typeof window === "undefined"
  ) return;



  const speech =
    new SpeechSynthesisUtterance(text);



  speech.lang = "cs-CZ";


  window.speechSynthesis.speak(
    speech
  );


}
