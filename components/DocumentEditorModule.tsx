"use client";
import React, { useState } from "react";

interface DocumentItem {
  id: number;
  title: string;
  subject: string;
  date: string;
  content: string;
  font?: "sans" | "serif" | "mono";
  lineSpacing?: "normal" | "relaxed" | "loose";
  fontSize?: "sm" | "md" | "lg";
}

const initialDocuments: DocumentItem[] = [
  { 
    id: 1, 
    title: "Semestrální práce z 3D grafik", 
    subject: "Informatika", 
    date: "5. 8. 2026", 
    content: "# Úvod\nTato práce se zabývá vykreslováním 3D scén pomocí moderních webových technologií...\n\n<img src=\"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop\" style=\"float: left; margin: 0 20px 15px 0; max-width: 280px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);\" alt=\"3D Grafika\" />\n\n## Hlavní část\nWebGL a WebGPU přinášejí obrovský posun v performanci. <span style=\"color: #38bdf8; font-weight: bold;\">Tato technologie</span> mění pohled na webové aplikace.\n\n<div style=\"clear: both;\"></div>\n\n> „Budoucnost webu je ve 3D.“ — Neznámý autor",
    font: "sans",
    lineSpacing: "relaxed",
    fontSize: "md"
  },
  { 
    id: 2, 
    title: "Esej na téma Umělá inteligence", 
    subject: "Filosofie", 
    date: "3. 8. 2026", 
    content: "# Etické aspekty AI\nS rozvojem velkých jazykových modelů vyvstává řada otázek ohledně autorství a autorských práv.",
    font: "serif",
    lineSpacing: "normal",
    fontSize: "md"
  },
];

export default function DocumentEditorModule() {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [filter, setFilter] = useState<string>("Vše");
  const [search, setSearch] = useState<string>("");
  
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [subject, setSubject] = useState<string>("Škola");
  const [content, setContent] = useState<string>("");
  const [fontFamily, setFontFamily] = useState<"sans" | "serif" | "mono">("sans");
  const [lineSpacing, setLineSpacing] = useState<"normal" | "relaxed" | "loose">("relaxed");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Stavy pro vkládání obrázku
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageAlign, setImageAlign] = useState<"left" | "right" | "center">("left");

  // Stav pro Hledat a nahradit
  const [showFindReplace, setShowFindReplace] = useState<boolean>(false);
  const [findText, setFindText] = useState<string>("");
  const [replaceText, setReplaceText] = useState<string>("");

  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const dynamicSubjects = ["Vše", ...Array.from(new Set(documents.map(d => d.subject).filter(Boolean)))];

  const filteredDocuments = documents.filter((item) => {
    const matchesSubject = filter === "Vše" || item.subject === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.content.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const insertFormatting = (syntax: string, wrapper: string = "") => {
    const textarea = document.getElementById("doc-content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = "";
    if (wrapper) {
      replacement = `${wrapper}${selectedText || "text"}${wrapper}`;
    } else {
      replacement = `${syntax}${selectedText}`;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntax.length, end + syntax.length);
    }, 0);
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;

    let imgStyle = "";
    if (imageAlign === "left") {
      imgStyle = 'style="float: left; margin: 0 20px 15px 0; max-width: 280px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);"';
    } else if (imageAlign === "right") {
      imgStyle = 'style="float: right; margin: 0 0 15px 20px; max-width: 280px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);"';
    } else {
      imgStyle = 'style="display: block; margin: 15px auto; max-width: 350px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);"';
    }

    const imageTag = `\n<img src="${imageUrl.trim()}" ${imgStyle} alt="Vložený obrázek" />\n${imageAlign !== "center" ? '<div style="clear: both;"></div>\n' : ""}`;
    
    setContent(prev => prev + imageTag);
    setImageUrl("");
    setShowImageModal(false);
  };

  const handleInsertTable = () => {
    const tableTemplate = "\n| Sloupec 1 | Sloupec 2 | Sloupec 3 |\n| :--- | :---: | ---: |\n| Data A1 | Data A2 | Data A3 |\n| Data B1 | Data B2 | Data B3 |\n";
    setContent(prev => prev + tableTemplate);
  };

  const handleInsertDate = () => {
    const currentDate = new Date().toLocaleDateString("cs-CZ");
    setContent(prev => prev + ` ${currentDate} `);
  };

  const handleFindAndReplace = () => {
    if (!findText) return;
    const regex = new RegExp(findText, "g");
    setContent(prev => prev.replace(regex, replaceText));
  };

  const applyTemplate = (type: "seminar" | "essay" | "empty") => {
    if (type === "seminar") {
      setContent("# Název práce\n\n## 1. Úvod\nZde popište motivaci a cíl práce...\n\n## 2. Hlavní část\nAnalýza problému a řešení...\n\n## 3. Závěr\nShrnutí výsledků...");
    } else if (type === "essay") {
      setContent("# Úvodní myšlenka\n\n## Argumentace\nPodpůrné argumenty a diskuze...\n\n## Shrnutí\nZávěrečné stanovisko...");
    } else {
      setContent("");
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const sentenceCount = content.trim() ? content.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = content.trim() ? content.split(/\n+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200);
  const normativePages = (wordCount / 1800).toFixed(1);

  const handleSave = () => {
    if (!title.trim()) return;

    const trimmedSubject = subject.trim() || "Ostatní";

    if (editingId) {
      setDocuments(documents.map(d => 
        d.id === editingId 
          ? { ...d, title: title.trim(), subject: trimmedSubject, content, font: fontFamily, lineSpacing, fontSize } 
          : d
      ));
    } else {
      const dateFormatted = new Date().toLocaleDateString("cs-CZ");
      const newDoc: DocumentItem = {
        id: Date.now(),
        title: title.trim(),
        subject: trimmedSubject,
        date: dateFormatted,
        content,
        font: fontFamily,
        lineSpacing,
        fontSize,
      };
      setDocuments([newDoc, ...documents]);
    }

    resetForm();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>, doc: DocumentItem) => {
    e.stopPropagation();
    setEditingId(doc.id);
    setTitle(doc.title);
    setSubject(doc.subject);
    setContent(doc.content);
    setFontFamily(doc.font || "sans");
    setLineSpacing(doc.lineSpacing || "relaxed");
    setFontSize(doc.fontSize || "md");
    setIsAdding(true);
    setActiveTab("write");
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setDocuments(documents.filter(d => d.id !== id));
  };

  const handleExportTxt = (e: React.MouseEvent<HTMLButtonElement>, doc: DocumentItem) => {
    e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([`${doc.title}\nPředmět: ${doc.subject}\nDatum: ${doc.date}\n\n${doc.content}`], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.toLowerCase().replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportMarkdown = (e: React.MouseEvent<HTMLButtonElement>, doc: DocumentItem) => {
    e.stopPropagation();
    const element = document.createElement("a");
    const file = new Blob([`# ${doc.title}\n*Předmět:* ${doc.subject} | *Datum:* ${doc.date}\n\n---\n\n${doc.content}`], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.toLowerCase().replace(/\s+/g, "_")}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportHtml = (e: React.MouseEvent<HTMLButtonElement>, doc: DocumentItem) => {
    e.stopPropagation();
    const htmlContent = `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>${doc.title}</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
        h1, h2, h3, h4 { color: #111; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
    <h1>${doc.title}</h1>
    <p><strong>Předmět:</strong> ${doc.subject} | <strong>Datum:</strong> ${doc.date}</p>
    <hr />
    <div>${doc.content.replace(/\n/g, '<br />')}</div>
</body>
</html>`;
    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title.toLowerCase().replace(/\s+/g, "_")}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const resetForm = () => {
    setTitle("");
    setSubject("Škola");
    setContent("");
    setFontFamily("sans");
    setLineSpacing("relaxed");
    setFontSize("md");
    setEditingId(null);
    setIsAdding(false);
    setActiveTab("write");
  };

  const toggleAddingForm = () => {
    if (isAdding) {
      resetForm();
    } else {
      setIsAdding(true);
    }
  };

  const getFontClass = (f?: string) => {
    if (f === "serif") return "font-serif";
    if (f === "mono") return "font-mono";
    return "font-sans";
  };

  const getLineSpacingClass = (ls?: string) => {
    if (ls === "normal") return "leading-normal";
    if (ls === "loose") return "leading-loose";
    return "leading-relaxed";
  };

  const getFontSizeClass = (fs?: string) => {
    if (fs === "sm") return "text-xs md:text-sm";
    if (fs === "lg") return "text-base md:text-lg";
    return "text-sm md:text-base";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      
      {/* Hlavička */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>📄</span> Editor dokumentů
          </h2>
          <p className="text-gray-400 text-sm mt-1">Pokročilý textový editor pro seminární práce, eseje a projekty.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Dokumentů</div>
            <div className="text-xl font-bold text-cyan-400">{documents.length}</div>
          </div>
          <button
            onClick={toggleAddingForm}
            className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-lg active:scale-95 ${
              isAdding 
                ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white shadow-cyan-500/20"
            }`}
          >
            {isAdding ? "Zrušit" : "+ Nový dokument"}
          </button>
        </div>
      </div>

      {/* Formulář / Editor */}
      {isAdding && (
        <div className="bg-white/5 border border-cyan-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-semibold text-white text-sm">
              {editingId ? "✏️ Úprava dokumentu" : "✨ Nový dokument"}
            </h3>
            
            <div className="flex items-center gap-2">
              {!editingId && (
                <div className="hidden md:flex gap-1">
                  <button type="button" onClick={() => applyTemplate("seminar")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] text-cyan-400 transition">Šablona: Práce</button>
                  <button type="button" onClick={() => applyTemplate("essay")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] text-cyan-400 transition">Šablona: Esej</button>
                </div>
              )}

              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("write")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeTab === "write" ? "bg-cyan-500 text-white shadow" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Psaní
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeTab === "preview" ? "bg-cyan-500 text-white shadow" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Náhled
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Název dokumentu..."
              className="sm:col-span-2 w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Předmět / Složka..."
              className="w-full p-3 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
            />
          </div>

          {/* Styly písma, velikost a řádkování */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-400 px-1 bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="flex items-center justify-between md:justify-start gap-2">
              <span>Font:</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => setFontFamily("sans")} className={`px-2 py-1 rounded-lg border transition ${fontFamily === "sans" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Sans</button>
                <button type="button" onClick={() => setFontFamily("serif")} className={`px-2 py-1 rounded-lg border font-serif transition ${fontFamily === "serif" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Serif</button>
                <button type="button" onClick={() => setFontFamily("mono")} className={`px-2 py-1 rounded-lg border font-mono transition ${fontFamily === "mono" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Mono</button>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-center gap-2">
              <span>Velikost:</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => setFontSize("sm")} className={`px-2 py-1 rounded-lg border transition ${fontSize === "sm" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Malé</button>
                <button type="button" onClick={() => setFontSize("md")} className={`px-2 py-1 rounded-lg border transition ${fontSize === "md" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Střední</button>
                <button type="button" onClick={() => setFontSize("lg")} className={`px-2 py-1 rounded-lg border transition ${fontSize === "lg" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>Velké</button>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-2">
              <span>Řádkování:</span>
              <div className="flex gap-1">
                <button type="button" onClick={() => setLineSpacing("normal")} className={`px-2 py-1 rounded-lg border transition ${lineSpacing === "normal" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>1.0</button>
                <button type="button" onClick={() => setLineSpacing("relaxed")} className={`px-2 py-1 rounded-lg border transition ${lineSpacing === "relaxed" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>1.5</button>
                <button type="button" onClick={() => setLineSpacing("loose")} className={`px-2 py-1 rounded-lg border transition ${lineSpacing === "loose" ? "bg-white/10 border-cyan-500 text-white" : "border-white/10 hover:bg-white/5"}`}>2.0</button>
              </div>
            </div>
          </div>

          {activeTab === "write" ? (
            <>
              {/* Přehledně uspořádaný panel nástrojů */}
              <div className="flex flex-col gap-2 p-3 bg-black/40 border border-white/10 rounded-2xl">
                
                {/* 1. Řádek: Nadpisy a styl písma */}
                <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/10">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mr-1">Struktura:</span>
                  <button type="button" onClick={() => insertFormatting("# ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 font-medium">H1</button>
                  <button type="button" onClick={() => insertFormatting("## ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 font-medium">H2</button>
                  <button type="button" onClick={() => insertFormatting("### ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 font-medium">H3</button>
                  <button type="button" onClick={() => insertFormatting("#### ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 font-medium">H4</button>
                  
                  <div className="w-[1px] h-5 bg-white/10 mx-2"></div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mr-1">Písmo:</span>
                  <button type="button" onClick={() => insertFormatting("**", "**")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 font-bold">B</button>
                  <button type="button" onClick={() => insertFormatting("*", "*")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 italic">I</button>
                  <button type="button" onClick={() => insertFormatting("<u>", "</u>")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 underline">U</button>
                  <button type="button" onClick={() => insertFormatting("<s>", "</s>")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-200 line-through">S</button>
                  
                  <div className="w-[1px] h-5 bg-white/10 mx-2"></div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mr-1">Barvy:</span>
                  <button type="button" onClick={() => insertFormatting('<span style="color: #38bdf8;">', '</span>')} className="px-2 py-1 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 rounded-lg text-xs text-sky-300 font-medium">Modrá</button>
                  <button type="button" onClick={() => insertFormatting('<span style="color: #f43f5e;">', '</span>')} className="px-2 py-1 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 rounded-lg text-xs text-rose-300 font-medium">Červená</button>
                  <button type="button" onClick={() => insertFormatting('<mark style="background-color: rgba(234, 179, 8, 0.3); color: #fff; padding: 2px 4px; border-radius: 4px;">', '</mark>')} className="px-2 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 rounded-lg text-xs text-yellow-300">Marker</button>
                </div>

                {/* 2. Řádek: Zarovnání, seznamy a vkládání */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mr-1">Odstavec:</span>
                  <button type="button" onClick={() => insertFormatting('<div style="text-align: left;">', '</div>')} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300" title="Vlevo">⫷</button>
                  <button type="button" onClick={() => insertFormatting('<div style="text-align: center;">', '</div>')} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300" title="Na střed">⫘</div>
                  <button type="button" onClick={() => insertFormatting('<div style="text-align: right;">', '</div>')} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300" title="Vpravo">⫸</div>
                  <button type="button" onClick={() => insertFormatting('<div style="text-align: justify;">', '</div>')} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300" title="Do bloku">≡</div>
                  
                  <div className="w-[1px] h-5 bg-white/10 mx-2"></div>
                  <button type="button" onClick={() => insertFormatting("- ")} className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">• Odrážka</button>
                  <button type="button" onClick={() => insertFormatting("1. ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">1. Číslo</button>
                  <button type="button" onClick={() => insertFormatting("- [ ] ")} className="px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">☑️ Úkol</button>
                  <button type="button" onClick={() => insertFormatting("> ")} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">💬 Citace</button>

                  <div className="w-[1px] h-5 bg-white/10 mx-2"></div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider mr-1">Vložit:</span>
                  <button type="button" onClick={() => setShowImageModal(true)} className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-xs text-cyan-300 font-medium">🖼️ Obrázek</button>
                  <button type="button" onClick={handleInsertTable} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">📊 Tabulka</button>
                  <button type="button" onClick={handleInsertDate} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">📅 Datum</button>
                  <button type="button" onClick={() => setShowFindReplace(!showFindReplace)} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300">🔍 Hledat</button>
                </div>

              </div>

              {/* Panel Hledat a nahradit */}
              {showFindReplace && (
                <div className="bg-black/50 border border-cyan-500/40 p-4 rounded-2xl space-y-3 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white text-xs font-semibold">🔍 Hledání a nahrazení textu</h4>
                    <button onClick={() => setShowFindReplace(false)} className="text-gray-400 hover:text-white text-xs">✕ Zavřít</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Hledat text..."
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                      className="p-2.5 rounded-xl border border-white/10 bg-[#090a0f] text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <input
                      type="text"
                      placeholder="Nahradit čím..."
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      className="p-2.5 rounded-xl border border-white/10 bg-[#090a0f] text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleFindAndReplace}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-xs transition"
                    >
                      Nahradit vše v textu
                    </button>
                  </div>
                </div>
              )}

              {/* Modální okno pro vložení obrázku */}
              {showImageModal && (
                <div className="bg-black/50 border border-cyan-500/40 p-4 rounded-2xl space-y-3 backdrop-blur-md">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white text-xs font-semibold">🖼️ Vložení obrázku s obtékáním</h4>
                    <button onClick={() => setShowImageModal(false)} className="text-gray-400 hover:text-white text-xs">✕ Zavřít</button>
                  </div>
                  <input
                    type="text"
                    placeholder="URL adresa obrázku (např. https://...)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-[#090a0f] text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-300 w-full sm:w-auto">
                      <span>Obtékání:</span>
                      <select
                        value={imageAlign}
                        onChange={(e) => setImageAlign(e.target.value as any)}
                        className="p-1.5 rounded-lg bg-[#090a0f] border border-white/10 text-white focus:outline-none"
                      >
                        <option value="left">Vlevo (text obtéká zprava)</option>
                        <option value="right">Vpravo (text obtéká zleva)</option>
                        <option value="center">Na střed (bez obtékání)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleInsertImage}
                      className="w-full sm:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-xs transition"
                    >
                      Vložit do textu
                    </button>
                  </div>
                </div>
              )}

              <textarea
                id="doc-content-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Začni psát text své práce..."
                rows={12}
                className={`w-full p-4 rounded-xl border border-white/10 bg-[#090a0f] text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y ${getFontClass(fontFamily)} ${getLineSpacingClass(lineSpacing)} ${getFontSizeClass(fontSize)}`}
              />
            </>
          ) : (
            <div 
              className={`w-full p-6 rounded-xl border border-white/10 bg-[#090a0f] text-gray-200 min-h-[300px] ${getFontClass(fontFamily)} ${getLineSpacingClass(lineSpacing)} ${getFontSizeClass(fontSize)}`}
              dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
            />
          )}

          {/* Statistiky dokumentu */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs text-gray-400 pt-2 border-t border-white/10">
            <div>Slov: <strong className="text-cyan-400">{wordCount}</strong></div>
            <div>Znaků: <strong className="text-cyan-400">{charCount}</strong></div>
            <div>Vět: <strong className="text-cyan-400">{sentenceCount}</strong></div>
            <div>Odstavců: <strong className="text-cyan-400">{paragraphCount}</strong></div>
            <div>Stránek (~): <strong className="text-cyan-400">{normativePages}</strong></div>
            <div>Čtení: <strong className="text-cyan-400">~{readingTime} min</strong></div>
          </div>
          {copySuccess && <div className="text-emerald-400 font-medium text-xs">✓ Zkopírováno do schránky!</div>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => handleCopyClipboard(content)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium rounded-xl text-sm transition-all"
            >
              📋 Kopírovat text
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-white font-semibold rounded-xl text-sm transition-all active:scale-95"
            >
              {editingId ? "Uložit změny dokumentu" : "Uložit dokument"}
            </button>
          </div>
        </div>
      )}

      {/* Vyhledávání a filtrace */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Hledat v dokumentech..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm shadow-lg"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {dynamicSubjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap text-sm font-semibold transition-all shadow-lg ${
                filter === s
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              } border backdrop-blur-xl`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Seznam dokumentů */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-xl text-center text-gray-400 text-sm">
          Žádné dokumenty nebyly nalezeny.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setViewingDoc(doc)}
              className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-xl shadow-lg flex flex-col justify-between group transition-all hover:bg-white/10 hover:border-cyan-500/30 relative cursor-pointer"
            >
              <div className="absolute top-4 right-4 flex gap-1 z-10">
                <button 
                  onClick={(e) => handleExportMarkdown(e, doc)}
                  className="p-1.5 text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Stáhnout jako Markdown (.md)"
                >
                  📝
                </button>
                <button 
                  onClick={(e) => handleExportHtml(e, doc)}
                  className="p-1.5 text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Stáhnout jako HTML"
                >
                  🌐
                </button>
                <button 
                  onClick={(e) => handleExportTxt(e, doc)}
                  className="p-1.5 text-gray-400 hover:text-emerald-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Stáhnout jako .txt"
                >
                  📥
                </button>
                <button 
                  onClick={(e) => handleEditClick(e, doc)}
                  className="p-1.5 text-gray-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Upravit"
                >
                  ✏️
                </button>
                <button 
                  onClick={(e) => handleDelete(e, doc.id)}
                  className="p-1.5 text-gray-400 hover:text-rose-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Smazat"
                >
                  🗑️
                </button>
              </div>

              <div className="pr-32 mb-4">
                <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors text-base line-clamp-1 mb-2">
                  {doc.title}
                </h3>
                <p className={`text-gray-400 text-xs line-clamp-3 ${getFontClass(doc.font)} ${getLineSpacingClass(doc.lineSpacing)}`}>
                  {doc.content.replace(/<[^>]*>?/gm, '') || "Prázdný dokument..."}
                </p>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10 inline-block w-fit">
                    📁 {doc.subject}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider pl-1">
                    {doc.date}
                  </span>
                </div>
                <span className="text-xs font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
                  Číst →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Celoobrazovkový náhled / čtečka dokumentu */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#090a0f] border border-white/10 p-6 md:p-8 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setViewingDoc(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-xl border border-white/10"
            >
              ✕ Zavřít
            </button>
            
            <div className="mb-6 pr-16">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border bg-white/5 text-gray-300 border-white/10">
                  📁 {viewingDoc.subject}
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {viewingDoc.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                {viewingDoc.title}
              </h2>
            </div>

            <div 
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[250px] text-gray-200 ${getFontClass(viewingDoc.font)} ${getLineSpacingClass(viewingDoc.lineSpacing)} ${getFontSizeClass(viewingDoc.fontSize)}`}
              dangerouslySetInnerHTML={{ __html: viewingDoc.content.replace(/\n/g, '<br />') }}
            />

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs text-gray-400 flex flex-wrap gap-3">
                <span>Slov: <strong className="text-cyan-400">{viewingDoc.content.trim() ? viewingDoc.content.trim().split(/\s+/).length : 0}</strong></span>
                <span>Normostran: <strong className="text-cyan-400">{((viewingDoc.content.trim() ? viewingDoc.content.trim().split(/\s+/).length : 0) / 250).toFixed(1)}</strong></span>
                <span>Doba čtení: <strong className="text-cyan-400">~{Math.ceil((viewingDoc.content.trim() ? viewingDoc.content.trim().split(/\s+/).length : 0) / 200)} min</strong></span>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => handleCopyClipboard(viewingDoc.content)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium rounded-xl text-sm transition-all"
                >
                  📋 Kopírovat
                </button>
                <button 
                  onClick={(e) => handleExportMarkdown(e, viewingDoc)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-amber-400 font-medium rounded-xl text-sm transition-all"
                >
                  📝 .md
                </button>
                <button 
                  onClick={(e) => handleExportHtml(e, viewingDoc)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 font-medium rounded-xl text-sm transition-all"
                >
                  🌐 HTML
                </button>
                <button 
                  onClick={(e) => handleExportTxt(e, viewingDoc)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 font-medium rounded-xl text-sm transition-all"
                >
                  📥 .txt
                </button>
                <button 
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setViewingDoc(null);
                    handleEditClick(e, viewingDoc);
                  }}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-all"
                >
                  ✏️ Upravit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
