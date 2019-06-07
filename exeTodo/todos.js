
// Definição de variáveis relacionadas a itens do corpo HTML
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

// Itens pré-fefinidos para serem passados a lista, pegando os valores da função que o localStorage definiu. É preciso transformar novamente para um Array, fazendo uam conversão de valor
var itensList = JSON.parse(localStorage.getItem('list_todos')) || [];

// Função que cria os elementos 'list itens', adiciona os textos a eles e os passa a lista já cliada no corpo HTML (referenciada aqui como uma variável)
function actionToDos (){
    listElement.innerHTML = ''; 

    for(todo of itensList){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);


        var linkElements = document.createElement('a');
        linkElements.setAttribute('href', '#');
        var excludeText = document.createTextNode(" Excluir");

        var position = itensList.indexOf(todo);
        linkElements.setAttribute('onclick', 'deleteToDo(' + position +')');

        linkElements.appendChild(excludeText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElements);
        listElement.appendChild(todoElement);
        
    };
};

actionToDos();

// Fubção responsável por adicionar novos 'list itens' que irão ser adicionados a lista do HTML
function addToDo(){
    var todoText = inputElement.value;

    itensList.push(todoText);
    inputElement.value = '';
    actionToDos();
    saveLocalStorage();
};

// Definido que ao clicar o botão, é executada a função que adiciona um novo item a lista
btnElement.onclick = addToDo;

// Função definida para deletar itens da lista ao clicar o botão 'Excluir'
function deleteToDo(position){
    itensList.splice(position, 1);
    actionToDos();
    saveLocalStorage();
}

// Função que vai salvar os dados no Storage, deixando definitiva as moficações que forem realiadas na operação do arquivo. Função localStorage funciona apenas com Strings! Como mostrado aqui, se for usado outro elemento é preciso converter o mesmo para String para ser usado essa função
function saveLocalStorage(){
    localStorage.setItem('list_todos', JSON.stringify(itensList));
}
