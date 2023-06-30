let itemList = []; // Array pra armazenar os items

function addItems() {
    // obtem os valores dos campos de input 
    let produtoInput = document.getElementById("produto").value;
    let preçoInput = document.getElementById("preço").value;
    
    // obtem o valor da checkbox selecionada
    let prioridadeCheckbox = document.getElementById("prioridade").checked;
    let normalCheckbox = document.getElementById("normal").checked;
    
    // Determina a prioridade baseado nas checkboxes
    let priority = "";
    if (prioridadeCheckbox) {
        priority = "Prioridade";
    } else if (normalCheckbox) {
        priority = "Normal";
    }
    
    // Cria um novo objeto de item
    let item = {
        produto: produtoInput,
        preço: preçoInput,
        prioridade: priority,
        bought: false // indica se o item já joi comprado (true) ou não (false)
    };
    
    // coloca o item no array
    itemList.push(item);
    
    // limpa os campos de input
    document.getElementById("produto").value = "";
    document.getElementById("preço").value = "";
    
    // Mostra a lista atualizada
    displayLists();
}

function displayLists() {
    // obtem os elements
    let priorityList = document.getElementById("priority-list");
    let toBuyList = document.getElementById("toBuy-list");
    let boughtList = document.getElementById("bought-list");
    
    // Limpa as listas
    priorityList.innerHTML = "";
    toBuyList.innerHTML = "";
    boughtList.innerHTML = "";
    
    itemList.forEach(function(item, index) {
        // Cria um item novo
        let listItem = document.createElement("li");
        
        // Cria um botão pra marcar o item como comprado
        let markButton = document.createElement("button");
        markButton.textContent = "Mark as Bought";
        
        // coloca um event listener pra marcar o item como comprado
        markButton.addEventListener("click", function() {
            item.bought = true; // Marca o item como comprado
            
            // atualiza as listas
            displayLists();
        });
        
        // coloca o botão de comprar no item
        listItem.appendChild(markButton);
        
        // Criar o botão pra editar o item
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        
        // coloque um event listener pra editar o item
        editButton.addEventListener("click", function() {
            // Implement your logic for editing the item here
            // For simplicity, let's just log a message for now
            console.log("Editing item: " + item.produto);
        });
        
        // coloca o botão de editar o item
        listItem.appendChild(editButton);
        
        // Cria o botão pra remover o item
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        
        // Coloca um event listener pra remover o item
        removeButton.addEventListener("click", function() {
            // Remove o item do itemList array
            itemList.splice(index, 1);
            
            // Atualiza as listas
            displayLists();
        });
        
        // coloca o botão de remover itens ao item na lista
        listItem.appendChild(removeButton);
        
        // Cria a label pro item
        let label = document.createElement("label");
        label.textContent = item.produto + ", " + item.preço;
        
        // coloca a label no item
        listItem.appendChild(label);
        
        // coloca o item na lista correspondente
        if (item.prioridade === "Prioridade") {
            priorityList.appendChild(listItem);
        } else if (item.bought) {
            boughtList.appendChild(listItem);
        } else {
            toBuyList.appendChild(listItem);
        }
    });
}