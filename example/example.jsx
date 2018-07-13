import React from 'react';
import ReactDOM from 'react-dom';
import Swt from '../src/SelfWritingText.jsx';

class App extends React.Component {
  render() {
    return (
      <Swt 
        textMajorIn={'Lorem ipsum dolor sit'}
        textIn={['amet consectetur adipisicing elit.', 'Minima sequi facilis quisquam', 'explicabo pariatur velit.']}
        willFreeze={false}
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