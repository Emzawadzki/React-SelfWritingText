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
      textMajorOut: '',
      textMajorIndex: 0,
      isVBarMajorHidden: false,
      isMajorFinished: false,
      textOut: '',
      textIndex: 0,
      isVBarHidden: true,
      // to be props
      textMajorIn: 'Lorem ipsum dolor sit',
      textIn: ['amet consectetur adipisicing elit.', 'Minima sequi facilis quisquam', 'explicabo pariatur velit.'],
      willFreeze: false,
      writingInterval: 50,
      pendingTime: 1000,
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
          this.setState({
            isVBarMajorHidden: !this.state.isVBarMajorHidden,
            isVBarHidden: !this.state.isVBarHidden
          })
          this.timer = setTimeout(() => {this.animateText(0)}, this.state.pendingTime);
          
        }
      }, this.state.writingInterval);
    };

    this.animateText = (index) => {
      let indexNum = parseInt(index);
      
      clearTimeout(this.timer);
      this.setState({
        textOut: '',
        textIndex: 0
      })

      this.interval = setInterval(() => {
        const text = this.state.textIn[indexNum];
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
        if(indexNum + 1 === this.state.textIn.length && this.state.willFreeze) {
          return null;
        }
        
        let nextIndex = ((indexNum + 1 < this.state.textIn.length) ? indexNum + 1 : 0);
        this.timer = setTimeout(() => {this.animateText(nextIndex)}, this.state.pendingTime);
      }, this.state.writingInterval)
    }
    this.animateMajorText();
  }

  componentWillUnmount() {
    clearInterval(this.majorInterval);
    clearInterval(this.interval);
    clearTimeout(this.timer)
  }
  
  render() {
    return(
      <div>
        <p>
          {this.state.textMajorOut}
          {!this.state.isVBarMajorHidden && <span>|</span>}
        </p>
        <p>
          {this.state.textOut}
          {!this.state.isVBarHidden && <span>|</span>}
        </p>
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

