Para o frontend utilizei o React Typescript conforme solicitado, além de utilizar tailwind para estilização.
A porta utilizada para o frontend foi a porta 3000.
Comandos necessários:
npm install
npm start
A ideia do projeto era criar uma listagem com todos os criadores de conteúdo que eu admiro, com pequenas informações sobre cada um, porém, precisei repetir os seus cadastros para testar a listagem com scroll infinito, perdendo um pouco de sua essência.
Busquei deixar a estilização bem semelhante ao protótipo.
Após termos toda a listagem deste pessoal, tu pode atualizar a quantidades de inscritos em tempo real! (Na verdade eu coloquei um post que a cada vez que tu atualiza ele acrescenta mais 5 inscritos ao canal hehe). Portanto, podemos atualizar quantos canais quisermos ao mesmo tempo. Ao escolher na checkbox quais os criadores desejamos, abre uma modal com estilização bem semelhante para verificar se o usuário tem certeza que quer prosseguir e verificar o canal atualizado. Você pode deixar a modal clicando no botão NÃO ou então clicando no X no canto superior direito.
Para realizar as requisições, me aventurei em chamá-las dentro de um useQuery, biblioteca que estava estudando a pouco tempo atrás e que corrige muitos erros que o useEffect acaba gerando quando o projeto acaba ficando mais complexo, além de que ele tem um atributo que verifica o uso de Scroll infinito, facilitando na hora de controlar o seus passos. 
Acredito que se tivesse mais tempo conseguiria fazer algo mais rendondinho, com o código mais limpo e organizado.
