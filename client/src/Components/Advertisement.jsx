import React from 'react'
import ad from "../assets/advertisement.jpg"
import "../Styles/Advertisement.css"

function Advertisement() {
    return (
        <div className='ad-wrapper'>
            <img src={ad} alt="" />
            <p>Order pipin hot food at your doorsteps</p>
            <a href="https://foodify-rishabhsharma.netlify.app/">www.foodify.com</a>
        </div>
    )
}

export default Advertisement