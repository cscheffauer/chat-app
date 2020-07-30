import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import Chat from './Chat.component';

// TODO: rework test with React Context https://stackoverflow.com/questions/54292298/jest-mock-react-context

describe('<Chat />', () => {
	let wrapper;
	const useridMock = '1234';
	const messagesMock = [
		{ username: 'Max', text: 'Hallo', sent: new Date('2020-01-01'), userid: '1', messageid: '1', state: '' },
		{ username: 'John', text: 'Hi', sent: new Date('2020-01-01'), userid: '2', messageid: '2', state: 'DELETED' },
		{ username: 'Jeffrey', text: "What's up?", sent: new Date('2020-01-01'), userid: '3', messageid: '3', state: 'EDITED' },
	];

	const sendMessageMock = jest.fn();
	const editMessage = jest.fn();
	const deleteMessage = jest.fn();

	beforeEach(() => {
		wrapper = mount(<Chat sendMessage={sendMessageMock} editMessage={editMessage} deleteMessage={deleteMessage} userid={useridMock} messages={messagesMock} />);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('expect to render Chat component', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
