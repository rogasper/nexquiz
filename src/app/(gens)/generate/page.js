"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "../../../components/Providers";
import SelecttableText from "../../../components/SelecttableText";
import Loader from "../../../components/Loader";
import Regenerate from "../../../components/Regenerate";
import Question from "../../../components/Question";
import { Toaster, toast } from "react-hot-toast";
import { Button, Modal } from "flowbite-react";
import { Editor } from "@monaco-editor/react";
import Icons from "../../../components/Icons";

function page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [value, setValue] = useState();
  const [scores, setScores] = useState(0);
  const [apiKey, setApiKey] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showNilai, setShowNilai] = useState(false);
  const [currentSelected, setCurrentSelected] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data, setData, setSoal, soal, isCode, language } =
    useContext(DataContext);
  const valueApi = useRef("");

  const backToHome = () => {
    // setData(null);
    setSoal([]);
    router.push("/");
  };

  const onSetApiKey = () => {
    setApiKey(valueApi.current.value);
    setShowModal(!showModal);
  };

  const handleClickGenerateCode = () => {
    fetchingData(data);
  };

  const fetchingData = async (item) => {
    setIsLoading(true);
    setValue(item);
    const res = await fetch("/api/generateQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teks: item, apiKey, isCode }),
    });
    setIsLoading(false);
    const result = await res.json();
    if (result.data === "ULANG") {
      setSoal([]);
      setIsError(true);
      toast.error(
        "GENERATE KUIS TIDAK SESUAI FORMAT. SILAHKAN TEKAN TOMBOL REGENERATE QUESTION"
      );
    } else if (result.data !== "") {
      setSoal(result.data);
    } else {
      setIsError(true);
      toast.error(result.message);
    }
  };
  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (apiKey != null) {
      localStorage.setItem("OPENAI", apiKey);
    }
  }, [apiKey]);
  useEffect(() => {
    const apiKey = localStorage.getItem("OPENAI");
    if (!apiKey) {
      setShowModal(!showModal);
    } else {
      setApiKey(apiKey);
    }
  }, []);
  useEffect(() => {
    setTotalScore(totalScore + soal.length);
  }, [soal]);

  return (
    <div className="-mt-5 wrapper">
      <div className="container grid grid-cols-2 px-3 mx-auto mb-3">
        <div>
          <button
            className="px-3 py-1 text-white bg-purple-700 rounded-md hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
            onClick={backToHome}
          >
            Kembali
          </button>
          <button
            className="px-3 py-1 ml-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            onClick={() => setShowModal(true)}
          >
            Set Api Key
          </button>
          <button
            className="px-3 py-1 ml-3 text-white rounded-md bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
            onClick={() => setShowNilai(true)}
          >
            Selesai
          </button>
        </div>
        <div className="text-right">
          <h3 className="text-2xl font-medium">
            Skor Anda: {scores}/{totalScore}
          </h3>
        </div>
      </div>
      <div className="container grid w-full gap-4 mx-4 mx-auto lg:grid-cols-2 sm:grid-cols-1">
        <div className="teks">
          <h1 className="mb-5 ml-3 text-2xl font-bold uppercase text-slate-900 dark:text-slate-100">
            Teks
          </h1>
          {isCode == true ? (
            <Editor
              height={"60vh"}
              width={"100%"}
              theme="vs-dark"
              language={language}
              options={{
                readOnly: true,
                minimap: { enabled: false },
              }}
              value={data}
            />
          ) : (
            <div className="overflow-y-scroll lg:h-96 sm:h-5/6 snap-y scrollbar scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-700">
              <SelecttableText
                text={data}
                fetchingData={fetchingData}
                setSoal={setSoal}
                setSelected={setSelected}
                setShow={setShow}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
          )}
        </div>
        <div className="mr-3 soal sm:ml-3">
          <h1 className="mb-5 text-2xl font-bold uppercase text-slate-900 dark:text-slate-100">
            Soal
          </h1>
          <div className="keterangan">
            <p>Pilih salah satu paragraf disamping untuk membuat soal</p>
          </div>
          {soal.length !== 0 ? (
            <Question
              questions={soal}
              manipulation={{
                currentQuestion,
                setCurrentQuestion,
                show,
                setShow,
                selected,
                setSelected,
                setCurrentSelected,
                currentSelected,
                setScores,
                setTotalScore,
                scores,
                totalScore,
              }}
            />
          ) : isLoading === true ? (
            <Loader />
          ) : isCode === true ? (
            <div className="p-6 mt-4 rounded-lg question-section dark:bg-slate-700 bg-slate-300 h-96">
              <div className="flex items-center justify-center h-full loading">
                <button
                  className="flex items-center bg-slate-400 dark:bg-slate-600 px-6 py-2.5 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-500 hover:text-slate-300"
                  onClick={handleClickGenerateCode}
                >
                  <Icons.RefreshCw size={"1.125rem"} />{" "}
                  <span className="ml-2 text-lg uppercase ">
                    Generate Question
                  </span>
                </button>
              </div>
            </div>
          ) : isError === true ? (
            <Regenerate value={value} fetchingData={fetchingData} />
          ) : (
            <div className="p-6 mt-4 rounded-lg question-section dark:bg-slate-700 bg-slate-300 h-96">
              <div className="flex items-center justify-center h-full loading"></div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Set Your API Key</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <input
              type="text"
              className="w-full dark:bg-slate-600 bg-slate-300"
              ref={valueApi}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSetApiKey}>Set</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNilai} onClose={() => setShowNilai(false)}>
        <Modal.Body>
          <div className="p-5 space-y-6">
            <h1 className="text-3xl font-bold text-center uppercase">
              Nilai Anda
            </h1>
            <h3 className="text-5xl font-extrabold text-center uppercase">
              {scores === 0 && totalScore === 0
                ? 0
                : ((scores / totalScore) * 100).toFixed(2)}
            </h3>
            <p className="font-medium text-center">
              🔥🔥Tetap semangat dan teruslah belajar🚀
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={backToHome} className="w-full">
            Home
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default page;
