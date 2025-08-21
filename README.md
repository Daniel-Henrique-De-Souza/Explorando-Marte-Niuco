# **Explorando Marte - Desafio Niuco 2025**  
  
Esta é uma aplicação em **TypeScript**, utilizando o framework **SvelteKit** para o desafio técnico da Niuco, onde sondas (rovers) em Marte são controladas com os seguintes comandos:  
  
- **L:** girar à esquerda  
- **R:** girar à direita  
- **M:** mover
  
As sondas devem respeitar os limites do planalto e evitar colisões, este projeto inclui verificações de segurança antes de executar os comandos. Fiz o uso dos padrões de design **Strategy**, **Command** e **Builder**. As pastas foram organizadas no estilo **MVC**, as visualizações seguem o padrão **Atomic Design**, e o projeto conta com os princípios **SOLID**. Os testes unitários são feitos com o **Vitest,** um framework do servidor **Vite**, junto com **CI no GitHub Actions**.  

## **Como Executar**  
  
Clone o repositório:

>git clone https://github.com/Daniel-Henrique-De-Souza/Explorando-Marte-Niuco.git  
cd Explorando-Marte-Niuco  
  
Instale as dependências:  
>npm install  
  
Rode a aplicação:  
>npm run dev  
  
No terminal, o Vite irá disponibilizar um endereço web, acesse-o pelo seu navegador. Na tela que aparecer, siga estes passos:  
  
1. Digite as dimensões do planalto (ex.: 5 5).  
2. Crie uma nova linha e digite a posição inicial e direção da sonda (ex.: 1 1 N).  
3. Crie mais uma linha e digite os comandos (ex.: MMR).
4. Aperte "Send" no teclado virtual.
5. Veja a execução em andamento, e depois a posição final ou mensagens de erro (planalto inválido, fora dos limites, colisão ou outros rovers) na parte de relatórios logo abaixo.
##   
## **Estrutura do Código**  
  
### **Modelos (src/models/):**  
  
* **Rover.ts**: Representa uma sonda, com posição (x, y), direção (N, S, E, W) e lista de comandos.  
### **Controladores (src/controllers/):**  
  
* **Commander.ts**: Executa as missões analisadas pelo **InputParser.ts**.
* **IBuilder.ts**, **IParser.ts**: Implementam classes que tratam do texto de entrada.
* **InputParser.ts**: Analisa o texto de entrada e instancia os objetos necessários para a missão.
* **RoverBuilder.ts**: Constrói um novo rover.
### **Comandos (src/controllers/commands/):**  
  
* **Command.ts**, **MoveForwardCommand.ts**, **TurnLeftCommand.ts**, **TurnRightCommand.ts**: Implementam as ações dos comandos do rover.
### **Visualizações (src/views/):**  
  
* **Button.svelte**: Botão padrão.  
* **NasaLogo.svelte**: Logo da NASA.  
* **NiucoLogo.svelte**: Logo da Niuco.  
* **RoverView.svelte**: O rover.  
* **ControlPanel.svelte**: Painel com teclado virtual.  
* **ReportPanel.svelte**: Painel de relatório.  
* **Board.svelte**: Planalto.  
##   
## **Decisões do Projeto**  

* **Alteração de comandos**: Para evitar confusões na hora de rodar o projeto, resolvi remover comandos não utilizados e adicionar outros para facilitar a execução de testes unitários e coverage.
* **Atomic Design**: Escolhi este padrão porque fica mais fácil para explorar entre as pastas.
* **Prototipagem no Penpot**: Para facilitar a construção da parte visual, escolhi utilizar esta ferramenta para agilizar o processo tanto para o planejamento inicial, quanto para o acabamento.

## **Design Patterns Escolhidos**  

### **Strategy Pattern**  
 
Como a entrada é texto, são necessários analisadores (“Parsers”) para traduzir as informações, utilizando sempre a função “parse”. Após isso, construir de fato os objetos para que possamos manipula-los dentro do código, utilizando os construtores (“Builders”), com a função “build”. Caso novos recursos sejam adicionados, é interessante haver estes contratos para garantir que sigam esse padrão ao analizar novas informações no texto e posteriormente construí-las.  
##   
### **Command Pattern**  
  
Para respeitar o princípio de responsabilidade única, resolvi criar uma classe abstrata de um comando e as respectivas ações em classes herdadas. Assim, há uma única classe para o comando L, R, e M. Se futuramente fosse introduzido o comando J, de “Jump”, fica muito mais fácil para implementação, além de que, automaticamente melhora a distribuição dos testes unitários. Todas essas classes de comando são gerenciadas pela classe Commander, que dentro de um dicionário, recebe a letra, e a respectiva classe que executa o comando. Com isso é necessário registrar todos os comandos antes, senão, será considerado um comando inválido.  
  
### **Builder Pattern**  
  
Ao criar novos rovers, fica muito melhor utilizar este padrão, pois com única linha é possível especificar a posição inicial, direção e comandos.  
  
## **Princípios SOLID**  
  
* **SRP (Single Responsibility Principle):** O **InputParser** analisa o texto, o **RoverBuilder** constrói os novas sondas, e o **Commander** executa e coordena as ações dos rovers.
* **OCP (Open/Closed Principle):** **IParser**, **IBuilder** e **Command** podem ser extendidas, mas não modificadas.
* **DIP (Dependency Inversion Principle):** A classe **Commander** recebe abstrações de **Command**, o que permite se criar novos comandos se necessário, mas não dependendo disso.
## **Debugging**  
  
O SvelteKir possui duas palavras reservados, que servem para depurar tanto o código, quanto os componentes visuais. Estes são: “@debug” e “debugger”.  

Quando estive desenvolvendo a classe **InputParser**, coloquei "debugger" dentro da função "parse", que serve como um breakpoint. Com o painel de ferramentas do desenvolvedor aberto, utilizei a aba “Fontes” (Sources). Quando clico no botão “Send” do teclado virtual no navegador, aparece uma tela levemente escura, que destaca a linha onde eu havia colocado “debugger” no Visual Code. Ao passar com o mouse em cima, pude validar as informações dos objetos nas linhas anteriores e ter certeza de que o texto estava sendo analisado corretamente.
  
## **Testes Unitários**  
  
**Localização:** tests  
**Comando:**  
>npm run test  
  
**Com UI:**  
>npm run test:ui  
  
**Gerar relatório de coverage:**  
>npm run cov  
  
## **Testes:**  
  
* **Commander.spec.ts**: Verifica a função de adição, carregamento do planato, rovers, início e condução dos comandos.  
* **InputParser.spec.ts**: Testa as entradas de texto em diferentes condições.  
* **MoveForwardCommand.spec.ts**: Verifica se ocorre o movimento e se está sendo respeitados os limites e posições de outros rovers.
* **TurnLeftCommand.spec.ts**: Testa o giro à esquerda nas diferentes posições.
* **TurnRightCommand.spec.ts**: Testa o giro à direita nas diferentes posições. 
## **Agentes de IA Utilizados**  
  
**ChatGPT:** Para resolver problemas de comportamento, geração de códigos repetitivos e algumas sugestões.

**Agente da Pesquisa do Google:** Para verificação de sintaxe.

## **CI com GitHub Actions**  
  
**Arquivo:** .github/workflows/ci.yml

Configurei a pipeline de CI solicitando para o ChatGPT o código pronto do arquivo YAML, visando uma aplicação em Node JS. Após isso, verifiquei se o código gerado possuía as últimas versões de @checkout, @setup-node, além de verificar se o comando "npm run test" estava sendo interpretado corretamente.
  
## **Vídeo no YouTube**  
  
Veja como foi todo o andamento no seguinte link:  
  
[Desafio Niuco 2025 | Explorando Marte | DevLog](https://youtu.be/QCx0rNE_yO0)  
  
## **Agradecimentos**  
  
Sou muito grato à **Niuco** por ter me dado a oportunidade de participar deste desafio. Quero poder ser uma força impulsionadora dentro do time de desenvolvimento, estando disposto a aprender coisas novas e ver outros pontos de vista. Sempre procuro fazer o meu melhor para agregar valor e entregar soluções profissionais. Sinceramente,  
  
Daniel H. Souza  
  
[daniel.henrique.sz@hotmail.com](mailto:daniel.henrique.sz@hotmail.com)