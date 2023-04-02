import React from 'react'
import Icons from './Icons'

function Loader() {
    return (
        <div className="question-section mt-4 rounded-lg p-6 dark:bg-slate-700 bg-slate-300 h-96">
            <div className="loading flex justify-center items-center h-full">
                <Icons.Loader2 className="animate-spin" size={80} />
            </div>
        </div>
    )
}

export default Loader