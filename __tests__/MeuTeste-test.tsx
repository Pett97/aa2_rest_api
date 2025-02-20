import { render } from '@testing-library/react-native';

import MeuTeste, { CustomText } from '../app/MeuTeste' ;


describe('<MeuTeste />', () => {
  test('Texto do meu MeuTeste', () => {
    const { getByText } = render(<MeuTeste />);

    getByText('Pett');
  });
});
