import { h } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";   

import "ojs/ojbutton";
import { ojButton } from "ojs/ojbutton";

import "ojs/ojinputtext";
import { ojInputText } from "ojs/ojinputtext";

import "ojs/ojradioset";
import { ojRadioset } from "ojs/ojradioset";

import "ojs/ojinputnumber";
import { ojInputNumber } from "ojs/ojinputnumber";


export function Content() {

    var [val1, setVal1] = useState(0);
    var [val2, setVal2] = useState(0);
    var [operation, setOperation] = useState("add");
    var [result, setResult] = useState(0);

    const updateVal1 = useCallback( (event: any) => {
        setVal1(event.detail.value);
        //calculateResult();
    }, [val1, setVal1]);

    const updateVal2 = useCallback( (event: any) => {
        setVal2(event.detail.value);
        //calculateResult();
    }, [val2, setVal2]);

    const updateOperation = useCallback( (event: any, currentOp: string) => {
        setOperation(event.target.value);
        //calculateResult();
    }, [operation, setOperation]);

    const calculateResult =  () => {
        let res = 0;
        switch(operation) {
            case "add":
                res = val1 + val2;  
                break;
            case "sub":
                res = val1 - val2;  
                break;
            case "mul":
                res = val1 * val2;  
                break;  
            case "div":
                res = val1 / val2;  
                break;  
        }
        setResult(res);
        console.log("Value 1: " + val1 + ", Value 2: " + val2 + ", Operation: " + operation + ", Result: " + res);
    };

    useEffect( () => {
        calculateResult();
    }, [val1, val2, operation]);

    return(

        <div style="border: 2px solid black; border-radius: 10px; padding: 10px; margin: 10px">
            <h2>Calculator</h2>
            
            <oj-label for="num1">Number 1: </oj-label> 
            <oj-input-number id="num1" value={val1} step={1} onvalueChanged={updateVal1} required></oj-input-number>
            
            <oj-label for="num2">Number 2: </oj-label> 
            <oj-input-number id="num2" value={val2} step={1} onvalueChanged={updateVal2} required></oj-input-number>
            
            <oj-label for="ops">Operations </oj-label> 
            <oj-radioset id="ops" value={operation} onvalueChanged={ (e) => updateOperation(e, operation)} required>
                <oj-option value={"add"}>Addition</oj-option>
                <oj-option value={"sub"}>Subtration</oj-option>
                <oj-option value={"mul"}>Multiplication</oj-option>
                <oj-option value={"div"}>Division</oj-option>
            </oj-radioset>


            <oj-button onojAction={calculateResult}>Calculate</oj-button>
            <h3>Result: {result}</h3>

        </div>  
            
    )
}
