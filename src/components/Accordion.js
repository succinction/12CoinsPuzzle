import React, { useEffect, useState } from 'react'
import { gsap as TweenLite, Power3 } from 'gsap'

function Accordion({ ID, groupID, actionID, groupFn, controler, callbackFn, children }) {
    const [isOpen, setIsOpen] = useState(0)
    const myID = `accordion_${ID}`
    groupID = !!groupID ? groupID : "noID"
    const groupAccordionFn = !!groupFn ? groupFn : (arg) => { console.log(" !! NOT groupFn: ", arg) }
    callbackFn = !!callbackFn ? callbackFn : () => { }

    useEffect(() => {
        const clickTarget = document.getElementById(actionID)
        clickTarget.addEventListener("click", (event) => {
            groupAccordionFn({ myID: myID, groupID: groupID })
            setIsOpen(isOpen + 3)
        })
    }, [])

    useEffect(() => {

        // const oneZero = isOpen ? 1 : 0
        const element = document.getElementById(myID)
        // const getHeight = () => element.scrollHeight
        console.log("element.scrollHeight:", element.scrollHeight);
        console.log("isOpen:", isOpen);
        const height = element.scrollHeight * (!!isOpen%2 ? 1 : 0) + "px"
        console.log("height:", height);
        TweenLite.to(element, { duration: .529, ease: Power3.easeOut, maxHeight: height })
        // this.setState({ isOpen: ON })
        // setIsOpen(ON)
        // this.state.isOpen = ON
        callbackFn(isOpen)
    }, [isOpen])

    // class Accordion extends Component {
    // constructor(props) {
    //     super(props)
    //     this.myID = `accordion_${this.props.ID}`
    //     // this.isOpen = true
    //     this.groupID = !!this.props.groupID ? this.props.groupID : "noID"
    //     this.clickTarget = ''// document.getElementById(this.props.actionID)
    //     this.groupAccordionFn = !!this.props.groupFn ? this.props.groupFn : (arg) => { console.log(" !! NOT groupFn: ", arg) }
    //     this.callbackFn = this.props.callbackFn ? this.props.callbackFn : () => { }

    //     this.state = {
    //         isOpen: true
    //     };
    // }

    // componentDidMount() {
    //     this._toggleSwitch()
    //     this.clickTarget = document.getElementById(this.props.actionID)
    //     this.clickTarget.addEventListener("click", (event) => {
    //         this._toggleSwitch()
    //     })
    // }

    // // componentWillReceiveProps(nextProps){
    // componentDidUpdate(prevProps, prevState){
    // // shouldComponentUpdate(nextProps) {
    //     // if (nextProps.controler.group === this.groupID) {
    //         // if (nextProps.controler.identifier !== this.myID) {
    //             // this._toggle(false)
    //     // this._toggle(!this.isOpen)
    //     //     }
    //     // }
    //     // return false
    // }

    // const _toggleSwitch = () => {
    //     // groupAccordionFn({ myID: myID, groupID: groupID })

    //     setIsOpen(!isOpen)
    //     // this._toggle(!isOpen)
    // }

    // const _toggle = (ON) => {
    //     const oneZero = ON ? 1 : 0
    //     const seconds = .529
    //     const element = document.getElementById(myID)
    //     // const getHeight = () => element.scrollHeight
    //     console.log("element.scrollHeight:", element.scrollHeight);
    //     const height = element.scrollHeight * oneZero + "px"
    //     TweenLite.to(element, { duration: seconds, ease: Power3.easeOut, maxHeight: height })
    //     // this.setState({ isOpen: ON })
    //     // setIsOpen(ON)
    //     // this.state.isOpen = ON
    //     this.callbackFn(this.state.isOpen)
    // }

    return (
        <div id={myID} style={{ "overflow": "hidden" }} >
            {children}
        </div>
    )
}

export default Accordion

//////////////////////////////////// USE
// import React, { Component } from 'react';

// import logo from './logo.svg';

// import './App.css';

// // import Quiz from './components/Quiz'

// import Accordion from './components/Accordion'



// class App extends Component {

//     constructor(props) {

//         super(props)

//         this.state = { controler: { identifier: "", group: "" } }

//     }



//     groupFn = (o) => {

//         this.setState({ controler: { identifier: o.myID, group: o.groupID } })

//     }



//     callbackFn = (bool) => {

//         // Do some side effect

//         console.log("callbackFn(" + bool + ")")

//     }



//     render() {

//         return (

//             <div className="App">

//                 <header className="App-header">

//                     <img src={logo} className="App-logo" alt="logo" />

//                     <h1 className="App-title">Accordion Render Prop</h1>

//                 </header>

//                 <button id="accordionClicker1" >Take Quiz One</button>

//                 <Accordion ID="me_1" actionID="accordionClicker1" groupID="AAA"  groupFn={this.groupFn} controler={this.state.controler} callbackFn={this.callbackFn} >

//                     <div>

//                         <p>  stuff 1</p>

//                         <p>callback function called</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <button id="accordionClicker_2" >Take Another Quiz</button>

//                 <Accordion ID="my_2" actionID="accordionClicker_2" groupID="AAA" groupFn={this.groupFn} controler={this.state.controler} >

//                     <div>

//                         <p>  stuff 2</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <h2>another set of things:</h2>

//                 <button id="{this.keyID}" >Tell Us about it</button>

//                 <Accordion ID="{this.keyID}" actionID="{this.keyID}"  callbackFn={this.callbackFn}>

//                     <div>

//                         <p>These are independent</p>

//                         <p>callback function called</p>

//                     </div>

//                 </Accordion>

//                 <button id="accordionClicker_3b" >Tell Us about it</button>

//                 <Accordion ID="me_3b" actionID="accordionClicker_3b" >

//                     <div>

//                         <p>Accordions do not need to be grouped. Only ID and actionID are required.</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <button id="accordionClicker_4b" >Tell Us about it</button>

//                 <Accordion ID="me_4b" actionID="accordionClicker_4b" >

//                     <div>

//                         <p>  hi 4</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <button id="accordionClicker_5b" >Tell Us about it</button>

//                 <Accordion ID="me_5b" actionID="accordionClicker_5b" >

//                     <div>

//                         <p>  hi5 </p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <h2>another set of things:</h2>

//                 <button id="accordionClicker_3" >Tell Us about it</button>

//                 <Accordion ID="me_3" actionID="accordionClicker_3" groupID="ABA"  groupFn={this.groupFn} controler={this.state.controler} >

//                     <div>

//                         <p>  hi 3</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <button id="accordionClicker_4" >Tell Us about it</button>

//                 <Accordion ID="me_4" actionID="accordionClicker_4" groupID="ABA"  groupFn={this.groupFn} controler={this.state.controler} >

//                     <div>

//                         <p>  hi 4</p>

//                     </div>

//                 </Accordion>

//                 <hr />

//                 <button id="accordionClicker_5" >Tell Us about it</button>

//                 <Accordion ID="me_5" actionID="accordionClicker_5" groupID="ABA"  groupFn={this.groupFn} controler={this.state.controler} >

//                     <div>

//                         <p>  hi5 </p>

//                     </div>

//                 </Accordion>

//                 <hr />

//             </div>

//         );

//     }

// }



// export default App;