import { createContext, useState } from "react";

export let CounterContext=createContext();


export default function CounterContextProvider(props){
    const [counter,setCounter]=useState(10)
    function changeCounter() {
        setCounter(Math.random())
    }
    return  <CounterContext.Provider value={{ setCounter,counter,changeCounter }}>
    {props.children}
    </CounterContext.Provider>
    
}