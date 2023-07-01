let itemList = []; // Array pra armazenar os items

// Função para adicionar itens à lista em formato de array e salvar no localStorage
function addItems() {
  const produtoInput = document.querySelector('.produto-input');
  const precoInput = document.querySelector('.preço-input');
  const priorityCheckbox = document.querySelector('.prioridade-checkbox');
  const normalCheckbox = document.querySelector('.normal-checkbox');

  const produto = produtoInput.value;
  const preco = precoInput.value;
  const prioridade = priorityCheckbox.checked;

  if (produto.trim() === '' || preco.trim() === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Obter a lista de itens do localStorage
  let itemList = localStorage.getItem('shoppingList');
  if (itemList) {
    itemList = JSON.parse(itemList);
  } else {
    itemList = {
      priority: [],
      toBuy: [],
      bought: []
    };
  }

  const item = {
    produto,
    preco,
  };

  // Adicionar o novo item à lista apropriada
  if (prioridade) {
    itemList.priority.push(item);
  } else {
    itemList.toBuy.push(item);
  }

  // Salvar a lista atualizada no localStorage
  localStorage.setItem('shoppingList', JSON.stringify(itemList));

  // Limpar os campos de entrada
  produtoInput.value = '';
  precoInput.value = '';

  // Chamar a função para mostrar os itens nas listas
  showItems();
}

// Função para mostrar os itens nas respectivas listas
function showItems() {
  const priorityList = document.getElementById('priority-list');
  const toBuyList = document.getElementById('toBuy-list');
  const boughtList = document.getElementById('bought-list');

  // Limpar as listas antes de exibir os itens
  priorityList.innerHTML = '';
  toBuyList.innerHTML = '';
  boughtList.innerHTML = '';

  // Obter a lista de itens do localStorage
  const itemList = localStorage.getItem('shoppingList');
  if (itemList) {
    const { priority, toBuy, bought } = JSON.parse(itemList);

    // Função para criar o botão de remoção de item
    function createRemoveButton(item, list) {
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remover';
      removeButton.addEventListener('click', () => {
        const index = list.indexOf(item);
        if (index !== -1) {
          list.splice(index, 1);
          localStorage.setItem('shoppingList', JSON.stringify(itemList));
          showItems();
        }
      });
      return removeButton;
    }

    // Função para criar o botão de reedição de item
    function createEditButton(item, list) {
      const editButton = document.createElement('button');
      editButton.innerText = 'Editar';
      editButton.addEventListener('click', () => {
        const produtoInput = document.querySelector('.produto-input');
        const precoInput = document.querySelector('.preço-input');
        const priorityCheckbox = document.querySelector('.prioridade-checkbox');
        const normalCheckbox = document.querySelector('.normal-checkbox');

        produtoInput.value = item.produto;
        precoInput.value = item.preco;
        priorityCheckbox.checked = list === priority;
        normalCheckbox.checked = list === toBuy;

        const index = list.indexOf(item);
        if (index !== -1) {
          list.splice(index, 1);
          localStorage.setItem('shoppingList', JSON.stringify(itemList));
          showItems();
        }
      });
      return editButton;
    }

    // Exibir os itens em cada lista
    priority.forEach((item) => {
      const listItem = document.createElement('li');
      const removeButton = createRemoveButton(item, priority);
      const editButton = createEditButton(item, priority);
      listItem.textContent = item.produto;
      listItem.appendChild(editButton);
      listItem.appendChild(removeButton);
      priorityList.appendChild(listItem);
    });

    toBuy.forEach((item) => {
      const listItem = document.createElement('li');
      const removeButton = createRemoveButton(item, toBuy);
      const editButton = createEditButton(item, toBuy);
      listItem.textContent = item.produto;
      listItem.appendChild(editButton);
      listItem.appendChild(removeButton);
      toBuyList.appendChild(listItem);
    });

    bought.forEach((item) => {
      const listItem = document.createElement('li');
      const removeButton = createRemoveButton(item, bought);
      const editButton = createEditButton(item, bought);
      listItem.textContent = item.produto;
      listItem.appendChild(editButton);
      listItem.appendChild(removeButton);
      boughtList.appendChild(listItem);
    });
  }
};

// Chamar a função para mostrar os itens iniciais
showItems();