import React from 'react';
import ReactDOM from 'react-dom';
import Swt from '../src/components/SelfWritingText.jsx';
import './example.css';

class App extends React.Component {
  render() {
    return (
      <Swt 
        textMajorIn={'This is a Self Writing Text Component.'}
        textIn={['It can write.', 'More than one line.', 'It can even freeze text.']}
        willFreeze={true}
        writingInterval={200}
        pendingTime={1000}
      />
    )
  }
}

document.addEventListener('DOMContentLoaded', function(){
   ReactDOM.render(
       <App />,
       document.getElementById('app')
   );
})