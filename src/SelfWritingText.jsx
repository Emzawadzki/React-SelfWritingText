import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Self Writing Text
 * 
 * @author [Michał Zawadzki](https://github.com/emzawadzki/)
 */
class Swt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textMajorIn: 'I am the major text',
      textMajorOut: '',
      textMajorIndex: 0,
      isMajorFinished: false,
      willMajorFreeze: true,
      textIn: ['Animated text', 'Text number 2', 'Words, words, words'],
      textOut: '',
      textIndex: 0,
      willFreeze: true,
      writingInterval: 200
    }
  }

  componentDidMount() {
    this.animateMajorText = () => {
      this.majorInterval = setInterval(() => {
        if(this.state.textMajorOut.length < this.state.textMajorIn.length) {
          this.setState({
            textMajorIndex: this.state.textMajorIndex + 1,
          }, () => {
            this.setState({
              textMajorOut: this.state.textMajorIn.slice(0, this.state.textMajorIndex)
            })
          })
        } else {
          clearInterval(this.majorInterval);
          this.animateText(0);
        }
      }, this.state.writingInterval);
    };

    this.animateText = (index) => {
      this.setState({
        textOut: '',
        textIndex: 0
      })
      this.interval = setInterval(() => {
        const text = this.state.textIn[index];
        if(this.state.textOut.length < text.length) {
          this.setState({
            textIndex: this.state.textIndex + 1,
          }, () => {
            this.setState({
              textOut: text.slice(0, this.state.textIndex)
            })
          })
          return null;
        }
        clearInterval(this.interval);
        if(index + 1 === this.state.textIn.length && this.state.willFreeze) {
          return null;
        }
        let nextIndex = index < this.state.textIn.length ? index + 1 : 0;
        this.animateText(nextIndex);
      }, this.state.writingInterval)
    }
    this.animateMajorText();
  }

  componentWillUnmount() {
    clearInterval(this.majorInterval);
    clearInterval(this.interval);
  }
  
  render() {
    return(
      <div>
        <p>{this.state.textMajorOut}<span>|</span></p>
        <p>{this.state.textOut}<span>|</span></p>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <Swt/>
    )
  }
}

document.addEventListener('DOMContentLoaded', function(){
   ReactDOM.render(
       <App />,
       document.getElementById('app')
   );
})

