'use strict'

const openModalEdit = () => document.getElementById('modal')
    .classList.add('active')

const openModalCreate = () => {
    document.getElementById('modal').classList.add('active')    
    document.getElementById('nomeCliente').dataset.index = 'new'
}

const closeModal = () => { 
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete

const deleteClient = (index) => {
    let dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
} 

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const db_client = getLocalStorage()
    db_client.push(client)
    setLocalStorage(db_client)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o Layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nomeCliente').value,
            email: document.getElementById('emailCliente').value,
            celular: document.getElementById('celularCliente').value,
            cidade: document.getElementById('cidadeCliente').value 
        }

        const index = document.getElementById('nomeCliente').dataset.index
        if(index == "new") {
            createClient(client)
            closeModal()
            updateTable()
        } else {
            updateClient(index, client)
            closeModal()
            updateTable() 
        }
    } 
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `

    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nomeCliente').value = client.nome
    document.getElementById('emailCliente').value = client.email
    document.getElementById('celularCliente').value = client.celular
    document.getElementById('cidadeCliente').value = client.cidade
    document.getElementById('nomeCliente').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModalEdit()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const message = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if(message) {
                deleteClient(index)
                updateTable()
            }
        }
    }
    
}

updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModalCreate)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('cancelar')
    .addEventListener('click', clearFields)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

