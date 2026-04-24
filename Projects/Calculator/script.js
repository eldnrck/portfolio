let operatorHTML = document.getElementById("operator");
let num2 = document.getElementById("secondNum")
let num1 = document.getElementById("firstNum");
const equals = document.getElementById("equals"); 
let result = document.getElementById("screen")
const buttonsContainer = document.querySelector(".buttons");    

const state = {
  current: 0,
  previous: null,
  answer: null,
  operator: null,
  computed: false
}


function updateDisplay() {
  result.value = state.current;
}

const resetState = () => {

  state.previous = null;
  state.operator = null;
  state.computed = false;
  num1.textContent = ''
  num2.textContent = ''  
  operatorHTML.textContent = ''
}

const mathOperations = () =>{
      if(state.current && state.previous && state.operator){
       if(state.operator === "+"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) + Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
        if(state.operator === "-"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) - Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
        if(state.operator === "/"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) / Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
        if(num2.textContent === '0'){
          state.current = 'Error: Unable to do operation'
          updateDisplay();

        }
       }
        if(state.operator === "x"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) * Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
    }
    if(!state.previous){
       if(state.operator === "+"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) + Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
        if(state.operator === "-"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) - Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
        if(state.operator === "/"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) / Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
        if(state.operator === "x"){
        num2.textContent = state.current;
        state.answer = Number(state.previous) * Number(state.current);
        state.current = state.answer;
        state.computed = true;
        updateDisplay();
       }
    }

}

function handleNumber(num) {
  if (!state.current || state.current === 'Error: Unable to do operation') {
    state.current = num;    
  } else {
    state.current += num;
  }
  if(state.computed){
    resetState();
   if(state.current){
    state.current = num;
   }
  }

  
  updateDisplay();
}

function handleOperator(operator){

    
    if(state.current === 'Error: Unable to do operation'){
        num1.textContent = '0'
        operatorHTML.textContent = operator;
        state.operator = operator;
        state.previous = null;
    }  
  
    if (!state.current && operator !== '-'){
        num1.textContent = state.current;
        operatorHTML.textContent = operator;
        
        state.operator = operator;

    }
    else if(!state.current && operator === '-')
      {
        state.current = operator;
        updateDisplay();
    }
    else if(state.current && state.current !== 'Error: Unable to do operation')
    {
        num1.textContent = state.current;
        state.previous = state.current;
        operatorHTML.textContent = operator;
        state.operator = operator;
        state.current = 0;
        updateDisplay();
    }


    if(state.computed){
        result.value = 0
        num2.textContent = ''
        state.computed = false;
       
    }

}

function handleEqual(){
mathOperations();
}

const handleEraser = (eraser) => {
if(eraser === 'C'){
  state.current = 0;
  state.previous = null;
  state.operator = null;
  state.computed = false;
  num1.textContent = state.previous;
  num2.textContent = state.previous;
  operatorHTML.textContent = state.operator;
  updateDisplay();
}
else if(eraser === 'CE'){
  state.current = 0
  updateDisplay();
  if(state.computed){
;
    state.current = 0;
    num2.textContent = ''
    updateDisplay();
    state.computed = false;
  }
}
else if(eraser === '⌫'){

      state.current = Number(state.current.toString().slice(0, -1)) || 0;
   updateDisplay();
  
 
}
}

function handleDecimal() {
    if (state.current.includes(".")) return;

    state.current += ".";
} 

function handleInput(value) {

    if (value === "." && !state.computed) {
      state.current = state.current.toString();
        if (state.current.includes(".")) return;
        state.current += ".";
        updateDisplay();
        return;
    }
  
    if (!state.current || state.current === 'Error: Unable to do operation' || state.current ==='0') {
      state.current = value;    
    } else {
      state.current += value;
    }
    if(state.computed){
      resetState();
    if(state.current){
      state.current = value;

   }
  }

  
  updateDisplay();


}


buttonsContainer.addEventListener("click",(e)=>{
  const value = e.target.textContent;
if(e.target.classList.contains("number")){
    handleInput(value);

}else if (e.target.classList.contains("operator")){
    handleOperator(value);

}else if(e.target.classList.contains("equals")){
    handleEqual()
}else if(e.target.classList.contains("eraser")){
    handleEraser(value)   
}

});

document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
         handleInput(e.key);
    } 
    else if (e.key === "Backspace") 
    {
      state.current = Number(state.current.toString().slice(0, -1)) || 0;
      
    } 
    
else if (e.key === "Enter") {
    handleEqual();

} else if (["+", "-", "*", "/"].includes(e.key)) {
    const operator = e.key === "*" ? "x" : e.key;
    handleOperator(operator);
} else if (e.key === ".") {
    handleInput(e.key);
}else if (e.key === "Escape") {
  state.current = 0;
  resetState();
}

    updateDisplay();
});
