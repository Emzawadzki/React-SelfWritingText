import React from 'react';
import PropTypes from 'prop-types';

/**
 * # Self Writing Text
 * 
 * ### [LIVE EXAMPLE](https://emzawadzki.github.io/React-SelfWritingText/example/)
 * 
 * @author [Michał Zawadzki](https://github.com/emzawadzki/)
 */
export default class Swt extends React.Component {
  static propTypes = {
    /**
     * String to be written in first line
     */
    textMajorIn: PropTypes.string.isRequired,
    /**
     * Array of strings to be written in second line
     */
    textIn: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Boolean value: true - stops changing text in a second line when reaches last; false - makes line changing infinitely
     */
    willFreeze: PropTypes.bool,
    /**
     * Number value of ms between letters typed
     */
    writingInterval: PropTypes.number,
    /**
     * Number value of ms between sentences (lines) changes
     */
    pendingTime: PropTypes.number,
    /**
     * Class of DOM container element, accepts string with class name (e.g. "my-fancy-class"). Nested P elements classes set as [parent-class]__line; nested v-bar elements classes set as [parent-class]__v-bar
     */
    class: PropTypes.string
  }

  static defaultProps = {
    willFreeze: true,
    writingInterval: 100,
    pendingTime: 1000,
    class: "self-writing-text"
  }

  constructor(props) {
    super(props);
    this.state = {
      textMajorOut: '',
      textMajorIndex: 0,
      isVBarMajorHidden: false,
      textOut: '',
      textIndex: 0,
      isVBarHidden: true
    }
  }

  componentDidMount() {
    this.animateMajorText = () => {
      this.majorInterval = setInterval(() => {
        if(this.state.textMajorOut.length < this.props.textMajorIn.length) {
          this.setState({
            textMajorIndex: this.state.textMajorIndex + 1,
          }, () => {
            this.setState({
              textMajorOut: this.props.textMajorIn.slice(0, this.state.textMajorIndex)
            })
          })
          return null;
        }
        clearInterval(this.majorInterval);
        this.setState({
          isVBarMajorHidden: !this.state.isVBarMajorHidden,
          isVBarHidden: !this.state.isVBarHidden
        })
        this.timer = setTimeout(() => {this.animateText(0)}, this.props.pendingTime);
          
      }, this.props.writingInterval);
    };

    this.animateText = (index) => {
      let indexNum = parseInt(index);
      
      clearTimeout(this.timer);
      this.setState({
        textOut: '',
        textIndex: 0
      })

      this.interval = setInterval(() => {
        const text = this.props.textIn[indexNum];
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
        if(indexNum + 1 === this.props.textIn.length && this.props.willFreeze) {
          return null;
        }
        
        let nextIndex = ((indexNum + 1 < this.props.textIn.length) ? indexNum + 1 : 0);
        this.timer = setTimeout(() => {this.animateText(nextIndex)}, this.props.pendingTime);
      }, this.props.writingInterval)
    }
    this.animateMajorText();
  }

  componentWillUnmount() {
    clearInterval(this.majorInterval);
    clearInterval(this.interval);
    clearTimeout(this.timer)
  }
  
  render() {
    if(!this.props.textMajorIn || !this.props.textIn) {
      return null;
    }
    
    return(
      <div className={this.props.class}>
        <p className={this.props.class + "__line"}>
          {this.state.textMajorOut}
          {!this.state.isVBarMajorHidden && <span className={this.props.class + "__v-bar"}>|</span>}
        </p>
        <p className={this.props.class + "__line"}>
          {this.state.textOut}
          {!this.state.isVBarHidden && <span className={this.props.class + "__v-bar"}>|</span>}
        </p>
      </div>
    )
  }
}