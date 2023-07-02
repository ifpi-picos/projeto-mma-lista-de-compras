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

  // Salvar as listas no localStorage
  saveListsToLocalStorage();
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
        saveListsToLocalStorage(); // Salvar as listas no localStorage após remover o item
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
        saveListsToLocalStorage(); // Salvar as listas no localStorage após editar o item
      }
    });
    return editButton;
  }

  // Função para criar o botão de marcar como comprado
  function createMarkAsBoughtButton(item, list) {
    const markAsBoughtButton = document.createElement('input');
    markAsBoughtButton.type = 'radio';
    markAsBoughtButton.classList = 'mark-radio'
    markAsBoughtButton.name = 'markAsBought';
    markAsBoughtButton.addEventListener('click', () => {
      const index = list.indexOf(item);
      if (index !== -1) {
        const boughtItem = list.splice(index, 1)[0];
        itemList.bought.push(boughtItem);
        showItems();
        saveListsToLocalStorage(); // Salvar as listas no localStorage após marcar como comprado
      };
    });
    return markAsBoughtButton;
  };

  // Exibir os itens em cada lista
  priority.forEach((item) => {
    const listItem = document.createElement('li');
    const markAsBoughtButton = createMarkAsBoughtButton(item, priority);
    const removeButton = createRemoveButton(item, priority);
    const editButton = createEditButton(item, priority);
    const itemText = document.createElement('span');
    itemText.textContent = `${item.produto} - R$ ${parseFloat(item.preco).toFixed(2)}`;
    listItem.appendChild(markAsBoughtButton);
    listItem.appendChild(itemText);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    priorityList.appendChild(listItem);
  });

  toBuy.forEach((item) => {
    const listItem = document.createElement('li');
    const markAsBoughtButton = createMarkAsBoughtButton(item, toBuy);
    const removeButton = createRemoveButton(item, toBuy);
    const editButton = createEditButton(item, toBuy);
    const itemText = document.createElement('span');
    itemText.textContent = `${item.produto} - R$ ${parseFloat(item.preco).toFixed(2)}`;
    listItem.appendChild(markAsBoughtButton);
    listItem.appendChild(itemText);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    toBuyList.appendChild(listItem);
  });

  bought.forEach((item) => {
    const listItem = document.createElement('li');
    const removeButton = createRemoveButton(item, bought);
    const editButton = createEditButton(item, bought);
    const itemText = document.createElement('span');
    itemText.textContent = `${item.produto} - R$ ${parseFloat(item.preco).toFixed(2)}`;
    listItem.appendChild(itemText);
    listItem.appendChild(editButton);
    listItem.appendChild(removeButton);
    boughtList.appendChild(listItem);
  });
};


// Função para salvar as listas no localStorage
function saveListsToLocalStorage() {
  localStorage.setItem('itemList', JSON.stringify(itemList));
};

// Função para carregar as listas do localStorage
function loadListsFromLocalStorage() {
  const storedItemList = localStorage.getItem('itemList');
  if (storedItemList) {
    itemList = JSON.parse(storedItemList);
  };
  showItems(); // Exibir os itens após carregar do localStorage
};

// Função para limpar as listas e o localStorage
function clearLists() {
  itemList = {
    priority: [],
    toBuy: [],
    bought: []
  };

  // Limpar o localStorage
  localStorage.removeItem('itemList');

  // Exibir as listas vazias
  showItems();
}


// Função para executar ao carregar a página
window.addEventListener('load', function() {
  loadListsFromLocalStorage();
});

// Função para executar antes de fechar a página
window.addEventListener('beforeunload', function() {
  saveListsToLocalStorage();
});

// Chamar a função para mostrar os itens nas listas
showItems();

let theme = document.getElementById("theme-select");;

function darkmode() {
  document.body.classList.toggle("dark-mode");
};