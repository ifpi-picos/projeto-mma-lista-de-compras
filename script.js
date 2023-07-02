// Variável que armazena os itens da lista
let itemList = {
  priority: [],
  toBuy: [],
  bought: []
};

// Função para adicionar itens à lista em formato de array
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

  // Limpar os campos de entrada
  produtoInput.value = '';
  precoInput.value = '';

  // Limpar os campos de seleção de rádio
  priorityCheckbox.checked = false;
  normalCheckbox.checked = false;

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

  const { priority, toBuy, bought } = itemList;

  // Função para criar o botão de remoção de item
  function createRemoveButton(item, list) {
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
      const index = list.indexOf(item);
      if (index !== -1) {
        list.splice(index, 1);
        showItems();
      }
    });
    return removeButton;
  }

  // Função para criar o botão de edição de item
  function createEditButton(item, list) {
    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.classList.add('edit-button');
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
        showItems();
      }
    });
    return editButton;
  }

  // Função para marcar um item como comprado
function markAsBought(item, list) {
  const index = list.indexOf(item);
  if (index !== -1) {
    list.splice(index, 1);
    itemList.bought.push(item);
    showItems();
  }
}

// Função para criar o botão de marcar como comprado
function createMarkAsBoughtButton(item, list) {
  const markAsBoughtButton = document.createElement('button');
  markAsBoughtButton.innerText = 'Marcar como comprado';
  markAsBoughtButton.classList.add('mark-as-bought-button');
  markAsBoughtButton.addEventListener('click', () => {
    markAsBought(item, list);
  });
  return markAsBoughtButton;
}

  // Exibir os itens em cada lista
  priority.forEach((item) => {
    const listItem = document.createElement('li');
    const removeButton = createRemoveButton(item, priority);
    const editButton = createEditButton(item, priority);
    const markButton = createMarkAsBoughtButton(item, priority);
    listItem.appendChild(markButton)
    listItem.textContent = item.produto;
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    priorityList.appendChild(listItem);
  });

  toBuy.forEach((item) => {
    const listItem = document.createElement('li');
    const removeButton = createRemoveButton(item, toBuy);
    const editButton = createEditButton(item, toBuy);
    const markButton = createMarkAsBoughtButton(item, toBuy);
    listItem.appendChild(markButton)
    listItem.textContent = item.produto;
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    toBuyList.appendChild(listItem);
  });

  bought.forEach((item) => {
    const listItem = document.createElement('li');
    const removeButton = createRemoveButton(item, bought);
    const editButton = createEditButton(item, bought);
    const markButton = createMarkAsBoughtButton(item, bought);
    listItem.appendChild(markButton)
    listItem.textContent = item.produto;
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    boughtList.appendChild(listItem);
  });
};

//chama a função que mostra os items
showItems();

const themeStyle = document.getElementById("themeSelect");
const themeSelect = document.getElementById("sort-by");

themeSelect.addEventListener("change", function (){
  themeStyle.setAttribute("href", "css/" + this.value + ".css");
})
