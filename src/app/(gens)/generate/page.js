"use client";

import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "../../../components/Providers";
import SelecttableText from "../../../components/SelecttableText";
import Loader from "../../../components/Loader";
import Regenerate from "../../../components/Regenerate";
import Question from "../../../components/Question";
import { Toaster, toast } from "react-hot-toast";

function page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [currentSelected, setCurrentSelected] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data, setData, setSoal, soal } = useContext(DataContext);

  const backToHome = () => {
    setData(null);
    setSoal([]);
    router.push("/");
  };

  const fetchingData = async (item) => {
    setIsLoading(true);
    const res = await fetch("/api/generateQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teks: item }),
    });
    setIsLoading(false);
    const data = await res.json();
    if (data.data !== "") {
      setSoal(data.data);
    } else {
      setIsError(true);
      toast.error(data.message);
    }
  };
  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, []);

  return (
    <div className="wrapper -mt-5">
      <div className="button-home ml-3 mb-5">
        <button
          className="text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700 px-3 py-1 rounded-md"
          onClick={backToHome}
        >
          Kembali
        </button>
      </div>
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 w-full mx-4 gap-4">
        <div className="teks">
          <h1 className="text-2xl text-slate-900 dark:text-slate-100 font-bold uppercase ml-3 mb-5">
            Teks
          </h1>
          <div className="overflow-y-scroll lg:h-96 sm:h-2/6 snap-y scrollbar scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-700">
            <SelecttableText
              text={data}
              fetchingData={fetchingData}
              setSoal={setSoal}
              setSelected={setSelected}
              setShow={setShow}
              setCurrentQuestion={setCurrentQuestion}
            />
          </div>
        </div>
        <div className="soal mr-3">
          <h1 className="text-2xl text-slate-900 dark:text-slate-100 font-bold uppercase mb-5">
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
              }}
            />
          ) : isLoading === true ? (
            <Loader />
          ) : isError === true ? (
            <Regenerate />
          ) : (
            <div className="question-section mt-4 rounded-lg p-6 dark:bg-slate-700 bg-slate-300 h-96">
              <div className="loading flex justify-center items-center h-full"></div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default page;
