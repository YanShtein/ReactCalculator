# ReactCalculator

FreeCodeCamp project: building 'React Calculator' --> <br/>
https://www.freecodecamp.org/learn/front-end-development-libraries/#react-and-redux

This project uses React to build a calculator.

<b>Project functionality:</b>
- The calculator uses keydown event listener to enable keyboard input.
- Consists of a formula display which shows the formula as it is entered, and a result display to show each key input and a result when clicking Enter.
- Display will check for formula length, if input is too long -> it will throw an error, the input gets checked and filtered.
- Pressing the AC or delete on key -> will clear both formula and result.
- 

A -Referencer- class which holds playSound method that when Drum is ON, the sound will play, and display will be updated accordingly with the triggered key pad name.
Ths class will render props for the div classes and id's to return next in class PadBank.
  
A -PadBank- class maps over the Array objects and returns withing the -Referencer- class, for each their own properties. finally -PadBank- will return the whole div parent set up for drum pads.
  
Finally class -App- holds initial states for the drum power, array, display pad name, and initial volume.
 
The PowerControl method initial state set to true, so the page will start with drum ON.
than each object will be bound to PowerControl method, otherwise all is off.

![Screenshot](DrumPad.png)


Results --> 
https://codepen.io/yansht/pen/GRQaJQr
