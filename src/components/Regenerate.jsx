import React from 'react'
import Icons from './Icons'

function Regenerate() {
    return (
        <div className="question-section mt-4 rounded-lg p-6 dark:bg-slate-700 bg-slate-300 h-96">
            <div className="loading flex justify-center items-center h-full">
                <button className="flex items-center bg-slate-400 dark:bg-slate-600 px-6 py-2.5 rounded-lg dark:hover:bg-slate-800 hover:bg-slate-500 hover:text-slate-300">
                    <Icons.RefreshCw size={"1.125rem"} />{" "}
                    <span className="text-lg ml-2 uppercase ">
                        Regenerate Question
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Regenerate