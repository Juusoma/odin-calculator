function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch(operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.error(`Invalid operator: ${operator}`);
    }
}

let memSlot = 0;
let operator = "";
let displayValue = "";
let shouldClearDisplay = false;
let displayDirty = false;
const maxDisplayCharacters = 7;

const calculatorDisplayElement = document.querySelector(".calculator-display");

function setDisplayValue(value){
    let clampedString = value.toString();
    if(clampedString.length > maxDisplayCharacters){
        if(clampedString.startsWith("-")){
            clampedString = clampedString.slice(0, maxDisplayCharacters+1);
        }
        else{
            clampedString = clampedString.slice(0, maxDisplayCharacters);
        }
    }

    displayValue = clampedString;
    calculatorDisplayElement.textContent = clampedString;
    displayDirty = true;
}

function reduceDisplayValue(){
    if(displayValue == "") return;
    setDisplayValue(displayValue.substr(0, displayValue.length-1));
}

function clearDisplay(){
    setDisplayValue("");
}

function clearMemory(){
    memSlot = 0;
    operator = "";
}

function addCharacterToDisplay(char){
    if(shouldClearDisplay){
        setDisplayValue("");
        shouldClearDisplay = false;
    }
    else if(displayValue.includes(".") && char == "."){
        return;
    }

    setDisplayValue(displayValue + char);
}

function swapSign(){
    let displayNum = parseFloat(displayValue);
    if(isNaN(displayNum)) return;

    displayNum *= -1;
    setDisplayValue(displayNum);
}

function setOperator(op){
    if(["+", "-", "/", "*"].includes(op))
        operator = op;
    else
        console.error(`Couldn't set operator: ${op}`)
}

function storeValueInMemory(value){
    let num = parseFloat(value);
    shouldClearDisplay = true;
    displayDirty = false;

    if(!isNaN(num)){
        memSlot = num;
    }
    else{
        memSlot = 0;
        console.error(`Couldn't parse float: ${value}`)
    }
}

function beginExpression(op){
    setOperator(op);
    
    //overwrite value in memory only if the user has input a new value
    //calculations can give more precise values than the user can input
    if(displayDirty)
        storeValueInMemory(displayValue);
}

function completeExpression(){
    if(operator === "") return;
    const num1 = memSlot;
    const num2 = parseFloat(displayValue);
    if(isNaN(num1) || isNaN(num2)) return;

    const result = operate(operator, num1, num2);
    setDisplayValue(result);
    storeValueInMemory(result);
    operator = "";
}

const calculatorKeypadElement = document.querySelector(".calculator-keypad");
calculatorKeypadElement.addEventListener("click", handleKeypadClick);
const clickAudio = new Audio("./public/click_01.wav");

function handleKeypadClick(e){

    let clickedButton = true;

    switch(e.target.id){
        case "button-clear":
            clearDisplay();
            clearMemory();
            break;
        case "button-backspace":
            reduceDisplayValue();
            break;
        case "button-nine":
            addCharacterToDisplay(9);
            break;
        case "button-eight":
            addCharacterToDisplay(8);
            break;
        case "button-seven":
            addCharacterToDisplay(7);
            break;
        case "button-six":
            addCharacterToDisplay(6);
            break;
        case "button-five":
            addCharacterToDisplay(5);
            break;
        case "button-four":
            addCharacterToDisplay(4);
            break;
        case "button-three":
            addCharacterToDisplay(3);
            break;
        case "button-two":
            addCharacterToDisplay(2);
            break;
        case "button-one":
            addCharacterToDisplay(1);
            break;
        case "button-zero":
            addCharacterToDisplay(0);
            break;
        case "button-decimal":
            addCharacterToDisplay(".");
            break;
        case "button-divide":
            beginExpression("/")
            break;
        case "button-multiply":
            beginExpression("*")
            break;
        case "button-add":
            beginExpression("+")
            break;
        case "button-subtract":
            beginExpression("-")
            break;
        case "button-sign":
            swapSign();
            break;
        case "button-equals":
            completeExpression();
            break;
        default:
            clickedButton = false;
            break;
    }
    
    if(clickedButton) clickAudio.play();
}