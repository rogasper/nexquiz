"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { DataContext } from "../components/Providers";
import { useRouter } from "next/navigation";
import { Tabs, Select } from "flowbite-react";
import { Editor } from "@monaco-editor/react";
import Icons from "../components/Icons";
const languages = [
  "php",
  "javascript",
  "go",
  "dart",
  "c",
  "csharp",
  "python",
  "java",
  "kotlin",
  "mysql",
];
export default function Home() {
  const [wordCount, setWordCount] = useState(0);
  const [allowed, setAllowed] = useState("");
  const [value, setvalue] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("php");
  const [disabledButton, setDisabledButton] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setData, setIsCode, setLanguage } = useContext(DataContext);
  const editorRef = useRef(null);
  const router = useRouter();

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleCodeSubmit = () => {
    // alert(editorRef.current.getValue());
    setIsLoading(true);
    setData(editorRef.current.getValue());
    setIsCode(true);
    setLanguage(selectLanguage);
    setIsLoading(false);
    router.push("/generate");
  };

  const changeLanguage = (e) => {
    setSelectLanguage(e.target.value);
  };

  const handleCountWords = (e) => {
    const text = e.target.value;
    setvalue(text);
    setWordCount(text.length);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const section = value.split("\n");
    const newArray = [];
    section.forEach((e) => {
      if (e.length !== 0) {
        newArray.push(e);
      }
    });
    setData(newArray);
    setIsCode(false);
    setIsLoading(false);
    router.push("/generate");
  };

  useEffect(() => {
    if (value.length <= 0) {
      setAllowed("cursor-not-allowed");
      setDisabledButton(true);
    } else if (value.length > 20000) {
      toast.error("Teks terlalu panjang");
      setAllowed("cursor-not-allowed");
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
      setAllowed("");
    }
  }, [value]);

  return (
    <div className="mx-auto max-w-2xl py-20 sm:py-24 lg:py-28">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-700 dark:text-slate-100 sm:text-6xl">
          NEXQUIZ
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
          uji kemampuan pengetahuanmu mengubah teks menjadi soal
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-x-6">
          <Tabs.Group style="default" className="w-full justify-center">
            <Tabs.Item title="Teks">
              <div className="rounded">
                <div
                  className={`textarea-custom ${
                    isFullscreen === true
                      ? "fixed top-[120px] left-0 w-full h-screen transition-all"
                      : ""
                  }`}
                >
                  <div
                    className={`container w-full bg-slate-300 dark:bg-slate-800 rounded-t p-2 flex flex-row-reverse `}
                  >
                    <button
                      className="fullscreen cursor-pointer"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen === true ? (
                        <Icons.Minimize />
                      ) : (
                        <Icons.Expand />
                      )}
                    </button>
                  </div>
                  <textarea
                    id="message"
                    rows="8"
                    className={`block p-2.5 ${
                      isFullscreen === true ? "h-3/5 transition-all" : ""
                    } w-full text-sm text-gray-900 bg-gray-50 rounded-b-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="masukkan teksmu..."
                    value={value}
                    onInput={handleCountWords}
                  ></textarea>
                  <p className="text-slate-700 dark:text-slate-300 block w-full text-right">
                    {wordCount}/20000
                  </p>
                </div>
                <div className="block w-full pt-4">
                  <button
                    type="button"
                    disabled={disabledButton}
                    className={`block w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900  ${allowed}`}
                    onClick={handleSubmit}
                  >
                    {isLoading == true ? (
                      <div className="loading flex justify-center items-center h-full">
                        <Icons.Loader2 className="animate-spin" size={80} />
                      </div>
                    ) : (
                      "Kirim"
                    )}
                  </button>
                </div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Code">
              <div className="select mb-3">
                <Select id="languages" onChange={changeLanguage}>
                  {languages.map((lang, id) => (
                    <option value={lang} key={id}>
                      {lang}
                    </option>
                  ))}
                </Select>
              </div>
              <Editor
                height={"40vh"}
                width={"100%"}
                theme="vs-dark"
                language={selectLanguage}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
              <div className="block w-full pt-4">
                <button
                  type="button"
                  // disabled={disabledButton}
                  className={`block w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 cursor-pointer`}
                  onClick={handleCodeSubmit}
                >
                  {isLoading == true ? (
                    <div className="loading flex justify-center items-center h-full">
                      <Icons.Loader2 className="animate-spin" size={80} />
                    </div>
                  ) : (
                    "Kirim"
                  )}
                </button>
              </div>
            </Tabs.Item>
          </Tabs.Group>
          {/* Teks Section */}

          {/* End Section */}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
