import React from 'react';
import { shallow } from 'enzyme';
import Swt from '../src/components/SelfWritingText.jsx';

describe('Rendering tests:', () => {
  it('Renders nothing without required props', () => {
    const wrapper = shallow(<Swt />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Renders correctly with props', () => {
    const wrapper = shallow(<Swt class={'myclass'} textMajorIn={'testingText'} textIn={['testText1', 'testText2', 'testText3']}/>);
    expect(wrapper).toMatchSnapshot();
  });
});