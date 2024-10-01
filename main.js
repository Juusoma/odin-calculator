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
