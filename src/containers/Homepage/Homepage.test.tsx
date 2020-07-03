import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './Homepage.component';

import { client } from '../../App';

describe('Container / Homepage', () => {
    const clientMock = client;
    const HomepageWrapper = shallow(<Homepage client={clientMock} />);

    it('expect to render Homepage container', () => {
        expect(HomepageWrapper).toMatchSnapshot();
    })
})


