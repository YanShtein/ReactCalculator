# ReactCalculator

FreeCodeCamp project: building 'React Calculator' --> <br/>
https://www.freecodecamp.org/learn/front-end-development-libraries/#react-and-redux

This project uses React to build a calculator.

<b>Project functionality:</b>
- The calculator uses keydown event listener to enable keyboard input.
- Consists of a formula display which shows the formula as it is entered, and a result display to show each key input and a result when clicking Enter.
- Display will check for formula length, if input is too long -> it will throw an error, the input gets checked and filtered.
- Pressing the AC or delete on key -> will clear both formula and result.
- The Calculate method splites formula into operators and numbers, a while loop will go over each operator and perform the calculation, when there is only one number left, hence all numbers has been calculated, answer will be shown in result, and calculator will be ready for next calculation.

![Screenshot](calc.png)


Results --> 
https://codepen.io/yansht/pen/GRQaJQr
