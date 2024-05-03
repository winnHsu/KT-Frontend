import React from 'react'

export default function TextButton({ onClick, text, backgroundColor, color }) {

    return (
        <button
            onClick={onClick}
            className='page-button'
            style={{ backgroundColor: backgroundColor, color: color }}>
            {text}
        </button>
    )
}
