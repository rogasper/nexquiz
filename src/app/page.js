"use client";
import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { DataContext } from "../components/Providers";
import { useRouter } from "next/navigation";

export default function Home() {
  const [wordCount, setWordCount] = useState(0);
  const [allowed, setAllowed] = useState("");
  const [value, setvalue] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const { setData } = useContext(DataContext);
  const router = useRouter();

  const handleCountWords = (e) => {
    const text = e.target.value;
    setvalue(text);
    setWordCount(text.length);
  };

  const handleSubmit = () => {
    const section = value.split("\n");
    const newArray = [];
    section.forEach((e) => {
      if (e.length !== 0) {
        newArray.push(e);
      }
    });
    setData(newArray);
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
          <textarea
            id="message"
            rows="8"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="masukkan teksmu..."
            value={value}
            // onChange={handleCountWords}
            onInput={handleCountWords}
          ></textarea>
          <p className="text-slate-700 dark:text-slate-300 block w-full text-right">
            {wordCount}/20000
          </p>
          <div className="block w-full pt-4">
            <button
              type="button"
              disabled={disabledButton}
              class={`block w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900  ${allowed}`}
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
