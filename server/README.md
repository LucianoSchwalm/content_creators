Aceitei o desafio de criar um backend no qual utiliza NestJS, juntamente com o Sequelize como ORM e Mysql como banco de dados.
Para iniciar o projeto é necessário instalar o mysql e criar uma senha igual a que criei ou alterar o atributo password no arquivo src/init-db.mjs.
Temos um arquivo que inicializa o banco, cria a tabela necessária e acrescenta 50 linhas para termos um escopo inicial.
Mantive todas as minhas criações de controller, model, module e service na pasta src/list.
Foi criado algumas rotas dentro da controller principal com path em src/list/content-creator.controller.ts, porém, só utilizamos a rota findPage e updateAllFollowers.
Foi meu primeiro projeto em NestJS, portanto, sinto que aprendi muito durante esse processo e além de desafiador, foi muito divertido.
A porta utilizada para o servidor foi a porta 3500.
No mais é isso, criei uns scripts para inicialização então para rodar tudo certinho será necessário rodar os seguinter comandos:
npm install
npm start
