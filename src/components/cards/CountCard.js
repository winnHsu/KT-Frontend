import React from 'react'
import './CountCard.css'

export default function CountCard({ src, alt, text, count }) {
    return (
        <div className='countCardContainer'>
            <img src={src} alt={alt} />
            <p>{text}</p>
            <p>{count}</p>
        </div>
    )
}
