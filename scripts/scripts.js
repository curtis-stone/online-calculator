class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement // sets these elements in claculator class
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // slice() deletes all number not in the array index range

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return 
        } // prevents multiple decimals. stops code from running if '.' is already includes in string
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation (operation) {
        if (this.currentOperand === '') {
            return
        } // stops code if currentOperand is empty
        if (this.previousOperand != '') {
            return this.compute()
        }
        this.operation = operation // operation --> passed in from button click
        this.previousOperand = this.currentOperand // number typed in becomes previous
        this.currentOperand = '' // clears display for second number

    }
    
    compute() {
        let computation // allows computation value to be set by switch statements
        const prev = parseFloat(this.previousOperand) // converts the string to a number (parseFloat)
        const current = parseFloat(this.currentOperand) // converts the string to a number (parseFloat)
        if (isNaN(prev) || isNaN(current)) {
            return
        } switch(this.operation) { // if statement w/ conditions
            case '+':
                computation = prev + current
                break
                case '-':
                computation = prev - current
                break
                case '*':
                computation = prev * current
                break
                case '÷':
                computation = prev / current
                break
                default: // else statement: return nothing
                return
        }
        this.currentOperand = computation // sets current to computation
        this.operation = undefined // clears operation
        this.previousOperand = '' // clears previosOperand
    }
    
    getDisplayNumber(number) { //helper function that includes commas ('en')
        const stringNumber = number.toString() // verifes that num is string
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // splits string num @ decimal. places it a [0] index of array. converts to a num
        const decimalDigits = stringNumber.split('.')[1] // splits stringNum @ decimal. places it as [1] index of array
        let integerDisplay // makes integerDigits var available
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) //returns a string with a language-sensitive representation of the number. 
        } 
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}` // returns the integerDigit num rep. (.) decimalDigits part of array at index [1]
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
         // shows previousOperand @ top of display (from chooseOperation(operation))
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
// selects all items with a data-number element
const operationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]') // why just selector and not selector all?

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) // defines a new class name
    
//appends numbers on click
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    }) // appends the numbers clicked 
 })

 //appends operations on click
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    }) // appends the numbers clicked 
 })

 //computes strings
 equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
 })

 //clear all 
 allClearButton.addEventListener('click', button => {
    calculator.clear() // clear() method removes all elements from a Set object
    calculator.updateDisplay()
 })

 // delete number
 deleteButton.addEventListener('click', button => {
    calculator.delete() // clear() method removes all elements from a Set object
    calculator.updateDisplay()
 })