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
        <div className="question-section rounded-lg p-6 dark:bg-slate-700 bg-slate-300">
            <div className="question-text mb-6">
                <h1 className='text-2xl uppercase pb-3'>Soal ke {currentQuestion + 1} dari {questions.length}</h1>
                <h3 className="text-lg">
                    {questions[currentQuestion].soal}
                </h3>
            </div>
            <div className="answer-section flex flex-col">
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
            <div className="add-button flex justify-between mt-3">
                {selected !== null ? show === true ? <div></div> : <button onClick={showAnswer}>Kirim</button> : <div></div>}
                <div className="next-back">
                    {show === true ? currentQuestion + 1 >= questions.length ? <div></div> : <button onClick={nextQuestions}>Next</button> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Question