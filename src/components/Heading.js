import React from 'react'
import Logo from "../assets/logo.png"
import "../scss/Heading.scss"

const Heading = () => {
    return (
        <div className="heading__container">
            <img src={Logo} width="300rem" height="auto" alt="A Song of Ice and Fire"/>
        </div>
    )
}

export default Heading
