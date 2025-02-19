# Como Rodar o Projeto

## Passo 1: Clonar o Repositório

Primeiro, clone o repositório do projeto utilizando o seguinte comando:

```bash
https://github.com/Pett97/react_native_rest_api.git
```
##instalar dependencias do projeto 
cd <PASTA_DO_PROJETO>
yarn install

## configurar o pocketbase 
cd pocketbase
./pocketbase serve --http=<SEU_IP_LOCAL>:8090

## configurar URL do projeto 
dentro do projeto temos que atualizar a constante BASE_URL para o seu IP LOCAL 
src/constants/baseUri.ts

const BASE_URL = "http://192.168.0.104:8090/"; 

subistuir para const BASE_URL = "http://<seu_ip_local>:8090/";

Caso o firewall esteja ativo no seu computador, você precisará liberar a porta 8090 para permitir a comunicação na rede local. Para isso, utilize o comando abaixo:
No Ubuntu
sudo ufw allow 8090

### acessar pocketbase
http://<seu_ip_local>:8090/_/

## rodar o projeto 
yarn start

## TESTES
navegar para a pasta cypressTest
instalar as dependencias com yarn install

rodar os teste com 

## R
A diferença entre testes unitários e testes E2E (End-to-End) em aplicações mobile está no escopo e no objetivo de cada um:

Testes Unitários são testes da aplicaçao nos modelos ou classes necessarias exemplo 
testar um comportamento de um objeto ou a ação de um controller no caso do mobile com react seria os comportamentos de um componente ou ação de um hook 

ja os teste E2E são os testes que envolvem a execução e operabilidade do usuario no sistema 
exemplo um componente List deve trazer a lista de produtos e cada Item da lista deve ter um componente comprar que vai adicionar o produto a uma lista de compra por exemplo 

