import React from 'react'

function Question({ questions, manipulation }) {
    const { currentQuestion, setCurrentQuestion, show, setShow, currentSelected, selected, setCurrentSelected, setSelected, scores, setScores } = manipulation

    const showAnswer = () => {
        show == false ? setShow(true) : setShow(false)

        if (questions[currentQuestion].opsiJawaban[selected].isCorrect) {
            // console.log("ANDA BENAR");
            setScores(scores + 1)
        }
    }
    const nextQuestions = () => {
        const nextQuestion = currentQuestion + 1
        setShow(false)
        setSelected(null)
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        }
    }
    const handleSelected = (index) => {
        if (currentSelected !== index) {
            setCurrentSelected(index)
            setSelected(index)
        } else {
            setSelected(null)
        }
    }
    return (
        <div className="p-6 rounded-lg question-section dark:bg-slate-700 bg-slate-300">
            <div className="mb-6 question-text">
                <h1 className='pb-3 text-2xl uppercase'>Soal ke {currentQuestion + 1} dari {questions.length}</h1>
                <h3 className="text-lg">
                    {questions[currentQuestion].soal}
                </h3>
            </div>
            <div className="flex flex-col answer-section">
                {questions[currentQuestion].opsiJawaban.map((answerOption, index) => {
                    if (answerOption.isCorrect === true && show === true) {
                        return (<button className={`text-left bg-green-400 dark:bg-green-600 dark:hover:bg-green-800 hover:bg-green-700 hover:text-green-300 px-6 py-2.5 rounded-md mb-2`} key={index}>
                            {answerOption.teks}
                        </button>)
                    }
                    return (<button className={`text-left ${index === selected ? "bg-slate-700 text-slate-300 dark:bg-slate-800 px-6 py-2.5 rounded-md mb-2 dark:hover:bg-slate-800 hover:bg-slate-700 hover:text-slate-300" : "bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-800 hover:bg-slate-700 hover:text-slate-300"}  px-6 py-2.5 rounded-md mb-2`} key={index}
                        onClick={() => handleSelected(index)}>
                        {answerOption.teks}
                    </button>)
                })}
            </div>
            <div className="flex justify-between mt-3 add-button">
                {selected !== null ? show === true ? <div></div> : <button onClick={showAnswer}>Kirim</button> : <div></div>}
                <div className="next-back">
                    {show === true ? currentQuestion + 1 >= questions.length ? <div></div> : <button onClick={nextQuestions}>Next</button> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Question