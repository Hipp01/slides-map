import React from 'react';
import { render } from '@testing-library/react-native';
import Map from '../components/Map';

test('renders correctly', () => {
  const { getByText } = render(<Map />);
  expect(getByText('Map Component')).toBeTruthy();
});