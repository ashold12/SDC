import React from 'react';
import { shallow } from 'enzyme';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';



describe(`<QuestionsAndAnswers />`, () => {

  it('Should render 4 questions initially', () => {
    console.log(wrapper.state)
    const wrapper = shallow(<QuestionsAndAnswers />);
    expect(wrapper.state.numberOfQuestionsToRender).toEqual(4);
  })


})