function addItem(event) {
  event.preventDefault();

  const itemInput = document.getElementById('item-input');
  const item = itemInput.value.trim();

  if (item !== '') {
    // Create container for list item
    const container = document.createElement('div');
    container.classList.add('item-container');

    // Create checkbox
    const checkbox = document.createElement('span');
    checkbox.classList.add('custom-checkbox');
    checkbox.addEventListener('click', function () {
      if (listItem.classList.contains('item-checked')) {
        listItem.classList.remove('item-checked');
        checkbox.classList.remove('checked');
      } else {
        listItem.classList.add('item-checked');
        checkbox.classList.add('checked');
      }
    });

    // Create item text
    const itemText = document.createElement('span');
    itemText.innerText = item;

    // Append checkbox and item text to the container
    container.appendChild(checkbox);
    container.appendChild(itemText);

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function () {
      listItem.remove();
    });

    // Create edit button
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', function () {
      const newText = prompt('Enter the new text:');
      if (newText !== null) {
        itemText.innerText = newText;
      }
    });

    // Append remove button and edit button to the container
    container.appendChild(editButton);
    container.appendChild(removeButton);

    const listItem = document.createElement('li');
    listItem.appendChild(container);

    document.getElementById('item-list').appendChild(listItem);

    itemInput.value = '';
  } else {
    alert('Você não adicionou nenhum item');
  }
}

document.getElementById('shopping-form').addEventListener('submit', addItem);

function darkmode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}