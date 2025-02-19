const LOC_TELA_HOME = {
  TITUTLO: "h1:contains(home/home)",
  BOTAO_CADASTRAR_NOVO_CARRO: "button:contains(Criar Novo Carro)",
  CAMPO_PESQUISAR_MARCA_CARRO: 'input[placeholder="Buscar Por Marca"]',
  TEXTO_NOME_CARRO:(nomeCarro)=>`div[dir="auto"]:contains(Name: ${nomeCarro})`
};

export default LOC_TELA_HOME;
