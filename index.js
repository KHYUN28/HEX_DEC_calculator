let displayValue = "";
let isHexMode = false;

function appendToDisplay(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = displayValue;
}

function eraseOnebyOne() {
  displayValue = displayValue.slice(0, -1);
  document.getElementById("display").value = displayValue
}

function calculate() {
  try {
    let result = evalBinaryExpression(displayValue);
    if (result <= 15) {
      if (isHexMode=true) {
        displayValue = result.toString(16).toUpperCase();
      } else {
        displayValue = formatWithThousandSeparator(result);
      }
      document.getElementById("display").value = displayValue;
    } else {
      if (isHexMode=false) {
        displayValue = result.toString(10).toUpperCase();
      } else {
        displayValue = formatWithThousandSeparator(result);
      }
      document.getElementById("display").value = displayValue;
    } 
  } catch (error) {
    displayValue = "Error";
    document.getElementById("display").value = displayValue;
  }
}

function formatWithThousandSeparator(number) {
  return Number(number).toLocaleString();
}

function decimalToHex() {
    const decimalNumber = parseInt(displayValue, 10);
    if (!isNaN(decimalNumber)) {
      // !isNaN 숫자가 아닌 대상은 true, 숫자면 false를 반환합니다.
      displayValue = decimalNumber.toString(16).toUpperCase();
      isHexMode = true;
      document.getElementById("display").value = displayValue;
    } else {
      throw new Error("Invalid input");
    }
}

function hecimalToDec() {
    const decimalNumber = parseInt(displayValue, 16);
    if (!isNaN(decimalNumber)) {
      displayValue = decimalNumber.toString(10)
      isHexMode = false;
      document.getElementById("display").value = displayValue;
    } else {
      throw new Error("Invalid input");
    }
}

function evalBinaryExpression(expression) {
  // 16진수 연산을 위해 16진수 숫자와 연산자로 이루어진 문자열을 평가합니다.
  const binaryExpression = expression.replace(/[0-9A-Fa-f]/g, match => parseInt(match, 16));
  // 평가된 10진수 표현식을 계산합니다.
  return Function(`"use strict";return (${binaryExpression})`)();
}

//jquery 라이브러리를 이용해서 비활성화합니다.
$(document).ready(function() {
  $('#dec').click(function() {
    $('#a, #b, #c, #d, #e, #f').prop('disabled', true);
    $('#hex').prop('disabled', false);});

  $('#hex').click(function() {
    $('#a, #b, #c, #d, #e, #f').prop('disabled', false);});
});