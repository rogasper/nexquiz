'use client'

import { useState } from "react"

function SelecttableText({ text, fetchingData, setSoal, setSelected, setShow, setCurrentQuestion }) {
    const [select, setSelect] = useState(null)
    const [currentSelect, setCurrentSelect] = useState(null)

    const handleSelected = (item, index) => {
        if (currentSelect !== index) {
            setCurrentSelect(index)
            setSelect(index)
            setCurrentQuestion(0)
            setShow(false)
            setSelected(null)
            setSoal([])
            fetchingData(item)
        }
    }
    return (
        text && text.map((item, index) => (
            <button disabled={index === select ? true : false} className={`bg-transparent text-left rounded-md p-5 m-3 ${index === select ? "border-l-8 border-l-indigo-600 text-slate-900 dark:text-slate-100 cursor-not-allowed" : "border-l-8 border-l-slate-600 text-slate-400 dark:text-slate-300 cursor-pointer"} text-sm snap-start`} key={index} onClick={() => handleSelected(item, index)}>
                {item}
            </button>
        ))
    )
}

export default SelecttableText