// Rozpoznávání hlasových příkazů Kaira.
// Funkce je čistá (bez vedlejších účinků) - o navigaci a mluvení
// se stará komponenta KairoModule, aby šlo správně řídit animaci postavičky.

export interface KairoCommandMatch {
  /** ID modulu, které se má nastavit přes setActiveModule (viz app/page.tsx) */
  moduleId: string;
  /** Krátká hlasová odpověď, kterou Kairo řekne uživateli */
  reply: string;
}

// Klíčová slova pro každý reálný modul aplikace (musí sedět na case v app/page.tsx)
const ROUTES: { moduleId: string; reply: string; keywords: string[] }[] = [
  {
    moduleId: "menu",
    reply: "Otevírám hlavní menu.",
    keywords: ["hlavní menu", "menu", "domů", "domovsk"],
  },
  {
    moduleId: "notes",
    reply: "Otevírám poznámky.",
    keywords: ["poznámk", "zápisk"],
  },
  {
    moduleId: "tasks",
    reply: "Otevírám úkoly a plánovač.",
    keywords: ["úkol", "plánovač", "úkoly"],
  },
  {
    moduleId: "flashcards",
    reply: "Otevírám kartičky na učení.",
    keywords: ["kartič", "flash"],
  },
  {
    moduleId: "focus-timer",
    reply: "Spouštím pomodoro časovač.",
    keywords: ["časovač", "pomodoro", "soustředění", "timer"],
  },
  {
    moduleId: "file-system",
    reply: "Otevírám správce souborů.",
    keywords: ["soubor", "správce souborů"],
  },
  {
    moduleId: "ai-solver",
    reply: "Otevírám AI asistenta a solver.",
    keywords: ["solver", "vyřeš", "poradí", "asistent"],
  },
  {
    moduleId: "ai-tests",
    reply: "Otevírám AI testy.",
    keywords: ["test"],
  },
  {
    moduleId: "document-editor",
    reply: "Otevírám editor dokumentů.",
    keywords: ["editor", "dokument", "esej", "seminárk"],
  },
  {
    moduleId: "shop",
    reply: "Otevírám obchod.",
    keywords: ["obchod", "kredit"],
  },
  {
    moduleId: "profile",
    reply: "Otevírám profil a nastavení.",
    keywords: ["profil", "nastavení"],
  },
];

/**
 * Zkusí najít navigační příkaz podle vysloveného textu.
 * Vrací null, pokud text neodpovídá žádnému příkazu aplikace -
 * v tom případě to KairoModule pošle na AI a Kairo odpoví běžnou větou.
 */
export function matchKairoCommand(spoken: string): KairoCommandMatch | null {
  const text = spoken.toLowerCase().trim();

  // "otevři menu", "přejdi na úkoly", "ukaž mi poznámky"... - klíčové slovo stačí kdekoliv ve větě
  for (const route of ROUTES) {
    if (route.keywords.some((kw) => text.includes(kw))) {
      return { moduleId: route.moduleId, reply: route.reply };
    }
  }

  return null;
}

export function isBackCommand(spoken: string): boolean {
  const text = spoken.toLowerCase();
  return text.includes("zpět") || text.includes("zavři");
}
