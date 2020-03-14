import { shallow } from 'enzyme'	;

import CommentSection from './commentSection';

// mock the fetch function
window.fetch = jest.fn(() => new Promise(() => {}));

describe('Comment section', () => {
  const component = shallow(<CommentSection articleId="test-article-id" />);

	it('clicks the show comments button', () => {
		component.find('button').simulate('click');
		// check if article id was passed in
		expect(window.fetch).toHaveBeenCalledWith('https://www.reddit.com/comments/test-article-id.json');
	})
});