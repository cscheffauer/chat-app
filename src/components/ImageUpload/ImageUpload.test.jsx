import React from 'react';
import { mount } from 'enzyme';
import ImageUpload from './ImageUpload.component';

const username = 'Max Mustermann';

describe('<ImageUpload />', () => {
	let wrapper;
	const mockOpenImagePreview = jest.fn();

	beforeEach(() => {
		wrapper = mount(<ImageUpload openImagePreview={mockOpenImagePreview} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('expect to render ImageUpload component', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('Testing the ImageUpload', () => {
		it('expect to have the function called on a input value change', () => {
			wrapper
				.find('input')
				.props()
				.onChange({ preventDefault() {} }); //change input
			expect(mockOpenImagePreview).toHaveBeenCalled();
		});
	});
});
