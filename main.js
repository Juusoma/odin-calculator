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
            debug.error(`Invalid operator: ${operator}`);
    }
}

console.log(`add 3 and 5: ${operate("+", 3, 5)}`);
console.log(`subtract 3 and 5: ${operate("-", 3, 5)}`);
console.log(`multiply 3 and 5: ${operate("*", 3, 5)}`);
console.log(`divide 3 and 5: ${operate("/", 3, 5)}`);

let memSlot1 = 0;
let memSlot2 = 0;
let operator = "";
let displayValue = "";
const maxDisplayCharacters = 7;

const calculatorDisplayElement = document.querySelector(".calculator-display");

function setDisplayText(str){
    calculatorDisplayElement.textContent = str;
}

function clearDisplay(){
    displayValue = "";
    setDisplayText("");
}

function addCharacterToDisplay(num){
    if(displayValue.length >= maxDisplayCharacters){
        return;
    }

    displayValue += num;
    setDisplayText(displayValue);
}

const calculatorKeypadElement = document.querySelector(".calculator-keypad");
calculatorKeypadElement.addEventListener("click", handleKeypadClick);

function handleKeypadClick(e){
    switch(e.target.id){
        case "button-clear":
            clearDisplay();
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
    }
}