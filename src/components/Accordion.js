import React, { useEffect } from 'react'
import { gsap, Power3 } from 'gsap'

function Accordion({ ID, children, buttonText }) {
    const myID = `accordion_${ID}`
    const persistent = localStorage.getItem(myID);
    let isOpen = persistent === "true"

    const activate = () => {
        isOpen = !isOpen;
        localStorage.setItem(myID, isOpen);
        const element = document.getElementById(myID)
        const height = (element.scrollHeight * (isOpen ? 1 : 0)) + "px"
        gsap.to(element, { duration: .8529, ease: Power3.easeOut, maxHeight: height })
    }
    useEffect(() => {
        const element = document.getElementById(myID)
        const height = (element.scrollHeight * (isOpen ? 1 : 0)) + "px"
        gsap.to(element, { duration: .29, ease: Power3.easeOut, maxHeight: height })
    }, [])
    useEffect(() => {
        const element = document.getElementById(myID)
        const height = (element.scrollHeight * (isOpen ? 1 : 0)) + "px"
        gsap.to(element, { duration: .29, ease: Power3.easeOut, maxHeight: height })
    }, [children])
    return (
        <>
            <button id={myID + 'button'} onClick={activate} className="accordion-button" >{buttonText} &nbsp; &nbsp; &nbsp; V </button>
            <div id={myID} style={{ "overflow": "hidden" }} >
                {children}
            </div>
        </>
    )
}

export default Accordion
