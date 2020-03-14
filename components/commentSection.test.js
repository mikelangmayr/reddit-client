import { shallow } from 'enzyme';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks()

import CommentSection from './commentSection';

// mock the fetch function
fetch = jest.fn(() => new Promise(() => {}));
fetchMock.mockResponse(fetch)

describe('Comment section', () => {
  const component = shallow(<CommentSection articleId="test-article-id" />);

	it('clicks the show comments button', () => {
		component.find('button').simulate('click');
		// check if article id was passed in
		expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/comments/test-article-id.json');
	})
});