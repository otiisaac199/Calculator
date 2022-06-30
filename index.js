const state = {
  result: 0,
  currentOperation: {
    firstOperands: "",
    secondOperands: "",
    operator: "",
    editModeId: [],
  },
};

const renderResult = () => {
  document.querySelector(".screen-result").innerHTML = state.result; //get from state
};

const renderFirstOperand = () => {
  document.querySelector(".screen-current-1st-operands").innerHTML =
    state.currentOperation["firstOperands"]; //get from state
};

const renderSecondOperand = () => {
  document.querySelector(".screen-current-2nd-operands").innerHTML =
    state.currentOperation["secondOperands"]; //get from state
};

const renderCurrentOperator = () => {
  document.querySelector(".screen-current-operator").innerHTML =
    state.currentOperation.operator; //get from state
};

renderResult();

// all d buttons
document.querySelectorAll(".operand").forEach((operand_button) => {
  operand_button.addEventListener("click", () => {
    const handleFirstCurrentOperand = () => {
      state.currentOperation["firstOperands"] += operand_button.textContent; // set to state
      renderFirstOperand();
    };
    const handleSecondCurrentOperand = () => {
      state.currentOperation["secondOperands"] += operand_button.textContent; // set to state
      renderSecondOperand();
    };

    if (state.currentOperation.editModeId) {
      if (state.currentOperation.editModeId === "firstOperands") {
        handleFirstCurrentOperand();
        4;
      } else {
        handleSecondCurrentOperand();
      }
    } else {
      if (state.currentOperation.operator !== "") {
        handleSecondCurrentOperand();
      } else {
        handleFirstCurrentOperand();
      }
    }
  });
});

// the calculation
const performCalculation = () => {
  if (state.currentOperation.operator == "+") {
    state.result =
      Number(state.currentOperation["firstOperands"]) +
      Number(state.currentOperation["secondOperands"]); // set state result for the "+" operation
  } else if (state.currentOperation.operator == "-") {
    state.result =
      Number(state.currentOperation["firstOperands"]) -
      Number(state.currentOperation["secondOperands"]); // set state result for the "-" operation
  } else if (state.currentOperation.operator == "*") {
    state.result =
      Number(state.currentOperation["firstOperands"]) *
      Number(state.currentOperation["secondOperands"]); // set state result for the "*" operation
  } else if (state.currentOperation.operator == "/") {
    state.result =
      Number(state.currentOperation["firstOperands"]) /
      Number(state.currentOperation["secondOperands"]); // set state result for the "/" operation
  }
};

document.querySelectorAll(".operator").forEach((operator_button) => {
  operator_button.addEventListener("click", () => {
    //(Calculate the complete current operation when another operator button is clicked)
    if (
      state.currentOperation.operator &&
      state.currentOperation["secondOperands"]
    ) {
      performCalculation(); // calculate the current operation and set the result to the state.result

      state.currentOperation["firstOperands"] = state.result; // set the result to the state.currentOperation.firstOperands
      state.currentOperation["secondOperands"] = ""; // set the state.currentOperation.secondOperands to empty

      // render all updates to the screen
      renderFirstOperand();
      renderSecondOperand();
      renderResult();
    }

    state.currentOperation.operator = operator_button.textContent;
    renderCurrentOperator();
  });
});

// Register the Event for the Equals btn
document.querySelector(".equals").addEventListener("click", () => {
  performCalculation(); // calculate the current operation and set the result to the state.result

  renderResult(); // render the state result to the DOM
});

document.querySelector(".ac").addEventListener("click", () => {
  /**
  - #1. Clear the state.result 
  - #2. Render result
  - #3. Clear all state.operation fields
  - #4. Render all operations (firstOperands, secondOperands and Operator)
   */
  state.result = 0; // #1
  renderResult(); // #2

  state.currentOperation = {
    // #3
    firstOperands: "",
    secondOperands: "",
    operator: "",
  };

  renderFirstOperand(); // #4
  renderSecondOperand();
  renderCurrentOperator();
});
