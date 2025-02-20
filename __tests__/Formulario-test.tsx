import { render } from "@testing-library/react-native";
import Formulario from "../src/components/formulario/formulario";
import TokenContextProvider from "../src/context/userContext";

describe("<Formulario />", () => {
  it("Verificar se tem os placeholders no formulário", () => {
    const { getByPlaceholderText } = render(
      <TokenContextProvider>
        <Formulario />
      </TokenContextProvider>
    );
    
    // Teste se os placeholders estão presentes
    expect(getByPlaceholderText("Marca do Carro")).toBeTruthy();
    expect(getByPlaceholderText("Nome do Carro")).toBeTruthy();
    expect(getByPlaceholderText("Potência em HPS")).toBeTruthy();
  });
});
