import React from 'react';
import { render } from '@testing-library/react-native';
import Car from '../src/components/car/Car';

describe('<Car />', () => {
  it('Tenho que ter o Carro Renderizado com Toyota Coroola', () => {
    const carProps = {
      brand: 'Toyota',
      name: 'Corolla',
      hp: 150,
    };

    const { getByText } = render(<Car {...carProps} />);
    expect(getByText('Brand: Toyota')).toBeTruthy();
    expect(getByText('Name: Corolla')).toBeTruthy();
    expect(getByText('HP: 150')).toBeTruthy();
  });
});
