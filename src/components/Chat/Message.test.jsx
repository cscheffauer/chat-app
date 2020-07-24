import React from 'react';
import { mount } from 'enzyme';

import Message from './Message.component';

describe('<Message />', () => {
    const useridMock = "1234";
    const messageidMock = "4321"
    const messageMock = { username: 'Max', text: 'Hallo', sent: new Date('2020-01-01'), userid: useridMock, messageid: messageidMock, state: "" };
    const deletedMock = { username: 'Max', text: 'Hallo', sent: new Date('2020-01-01'), userid: useridMock, messageid: messageidMock, state: "DELETED" };
    const switchToEditModeMock = jest.fn();
    const deleteMessageMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    const wrapperUserSame = mount(<Message switchToEditMode={switchToEditModeMock} deleteMessage={deleteMessageMock} message={messageMock} userid={useridMock} />)

    it('expect to render Chat component', () => {
        expect(wrapperUserSame).toMatchSnapshot();
    })


    describe('Testing the Message Functions', () => {

        it('should hide message has been deleted information', () => {
            const deleted = wrapperUserSame.find('.deleted');
            expect(deleted.exists()).toBeFalsy();
        });

        it('should delete the message on click', () => {
            const deleteSpan = wrapperUserSame.find('.option').at(0);
            deleteSpan.props().onClick({ preventDefault() { } });

            expect(deleteMessageMock).toHaveBeenCalledWith(messageidMock);
        });

        const wrapperUserDifferent = mount(<Message switchToEditMode={switchToEditModeMock} deleteMessage={deleteMessageMock} message={messageMock} userid={"12"} />)
        it('should hide options if user is different than message userid', () => {
            const options = wrapperUserDifferent.find('.option');
            expect(options.exists()).toBeFalsy();
        });

        const wrapperMessageDeleted = mount(<Message switchToEditMode={switchToEditModeMock} deleteMessage={deleteMessageMock} message={deletedMock} userid={"12"} />)
        it('should show message has been deleted information', () => {
            const deleted = wrapperMessageDeleted.find('.deleted');
            expect(deleted.exists()).toBeTruthy();
            expect(deleted.text()).toEqual("Message has been deleted by " + deletedMock.username)
        });
    });
})


