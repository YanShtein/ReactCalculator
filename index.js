import { click } from '@testing-library/user-event/dist/click';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const hasOperator = /[*+\-/]/;
const startsWithZero = /^[0]/;
const displayError = 'Long input press AC';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: '',
      result: 0,
    };

    this.DisplayBoth = this.DisplayBoth.bind(this);//FORMULA entered+display value entered in RESULT
    this.DisplayClear = this.DisplayClear.bind(this); //clear both displays and set to 0
    this.Calculate = this.Calculate.bind(this);
    this.KeyPress = this.KeyPress.bind(this);
  };

  componentDidMount() {
    // The keydown event is fired when a key is pressed.
    document.addEventListener('keydown', this.KeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.KeyPress);
  }

  KeyPress(event) {
    // key read-only property returns the value of the key pressed by the user
    // console.log('key pressed:' , event.key)
    let nums = ['1','2','3','4','5','6','7','8','9','0', '-', '+', '*', '/', '.'];
    if (nums.indexOf(event.key) > -1) {
      event.target.value = event.key;
      this.DisplayBoth(event);
    } else {
      // if = key pressed, it triggers componentMount which triggers this.KeyPress 
      if (event.key === 'Enter') {
        event.target.value = '=';
        event.preventDefault(); //prevents last key pressed in gui
        this.Calculate(event);
      } else {
        if (event.key === 'Backspace') {
          this.DisplayClear();
        };
      };
    };
  };

  DisplayBoth(event) {
    if (this.state.formula.length > 26 || this.state.result.length > 26 || this.state.result === displayError) {
      this.setState({
        formula: '',
        result: displayError
      });
    } else if (hasOperator.test(event.target.value)) {
      this.setState({
        formula: this.state.formula + event.target.value,
        result: event.target.value
      });
    } else if (startsWithZero.test(this.state.result) || hasOperator.test(this.state.result)) {
      this.setState({
        formula: this.state.formula.concat(event.target.value), //display FORMULA as entered & display left->right
        result: event.target.value //when value clicked, display value one by one in RESULT
    });
    } else if (this.state.result.includes('.') && event.target.value === '.') {
    } else {
      this.setState({
        formula: this.state.formula.concat(event.target.value),
        result: this.state.result + event.target.value
      });
    };
  };

  DisplayClear() {
    this.setState({
      formula: '', //set to FORMULA display to empty initial state
      result: 0, //set RESULT display to initial state
    });
  };

  Calculate() {
    let numbers = this.state.formula.split(/[+||\-||*||/]+/).map(Number);
    let operators = this.state.formula.split(/[0-9]+/).filter(item => item !== '' && item !== '.'); // filter for empty strings of the numbers
    operators = operators.map((op, i) => {
      if (op.substring(op.length - 1) === '-' && op.length > 1) { // if op > 1 & ends with (-), examaple 4*-2
        numbers[i + 1] = numbers[i + 1] * -1; // 2 = 2*(-1)=-2 // now -2 is a number in numbers array 
        console.log(numbers[i + 1])
        return op.substring(op.length -2, op.length -1) // return op before (-) which is (*) -> 4*(-2)= -16
      } else {
        return op.substring(op.length - 1)
      };
    });

    console.log(numbers)
    console.log(operators)

    while (numbers.length > 1) {
      let divIndex = operators.indexOf('/');
      let multIndex = operators.indexOf('*');
      let addIndex = operators.indexOf('+');
      let subIndex = operators.indexOf('-');

      if (divIndex > -1) {
        numbers[divIndex] = numbers[divIndex] / numbers[divIndex + 1]
        numbers.splice(divIndex + 1, 1)
        operators.splice(divIndex, 1)
      } else {
      if (multIndex > -1) {
        numbers[multIndex] = numbers[multIndex] * numbers[multIndex + 1] //1+2*3-> array now 1+6*3
        numbers.splice(multIndex + 1, 1) //1+6*3 -> to remove the 3
        operators.splice(multIndex, 1) //removes the * as it was already used
      } else {
      if (subIndex > -1) {
        numbers[subIndex] = numbers[subIndex] - numbers[subIndex + 1]
        numbers.splice(subIndex + 1, 1)
        operators.splice(subIndex, 1)
      } else {
      if (addIndex > -1) {
        numbers[addIndex] = numbers[addIndex] + numbers[addIndex + 1]
        numbers.splice(addIndex + 1, 1)
        operators.splice(addIndex, 1)
      }}}};
    };

    let answer = Math.round(numbers[0] * 1000000000000) / 1000000000000;

    if (Number.isNaN(answer)) { //prevents from second click showing NaN in console
      answer = numbers[0];
      } else {
      if (this.state.formula.length > 0) { // didnt AC yet
        this.setState({
          formula: answer,
          result: answer,
        });
      };
    };
  };

  render() {
    // the default is mouse pressed, else its keyboard pressed which than triggers DisplayBoth etc
    let mouseORkey = this.DisplayBoth ? this.DisplayBoth : this.KeyPress;
    return (
      <div className='container'>
        <div className='calculator'>
          <div className='display'>
            <div className='formulaScreen'>{this.state.formula}</div>
            <div className='resultScreen' id='display'>{this.state.result}</div>
          </div>
          <div className='pad'>
            <button id='clear' value='AC' onClick={this.DisplayClear}>AC</button>
            <button id='add' value='+' onClick={mouseORkey}>+</button>
            <button id='subtract' value='-' onClick={mouseORkey}>-</button>
            <button id='seven' value='7' onClick={mouseORkey}>7</button>
            <button id='eight' value='8' onClick={mouseORkey}>8</button>
            <button id='nine' value='9' onClick={mouseORkey}>9</button>
            <button id='divide' value='/' onClick={mouseORkey}>/</button>
            <button id='four' value='4' onClick={mouseORkey}>4</button>
            <button id='five' value='5' onClick={mouseORkey}>5</button>
            <button id='six' value='6' onClick={mouseORkey}>6</button>
            <button id='multiply' value='*' onClick={mouseORkey}>*</button>
            <button id='one' value='1' onClick={mouseORkey}>1</button>
            <button id='two' value='2' onClick={mouseORkey}>2</button>
            <button id='three' value='3' onClick={mouseORkey}>3</button>
            <button id='zero' value='0' onClick={mouseORkey}>0</button>
            <button id='decimal' value='.' onClick={mouseORkey}>.</button>
            <button id='equals' value='=' onClick={this.Calculate}>=</button>
          </div>  
        </div>
        <div className='author'>
          Designed and coded by
          <a href='https://github.com/YanShtein'>Yan Shtein</a>
        </div>
      </div>
    );
  };
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// ReactDOM.render(<App />, document.getElementById('root'));
