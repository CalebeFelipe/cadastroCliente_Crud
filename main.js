'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Carlos",
    email: "carlos@gmail.com",
    celular: "11123456789",
    cidade: "Ap-Goiânia"
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
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nomeCliente').value,
            email: document.getElementById('emailCliente').value,
            celular: document.getElementById('celularCliente').value,
            cidade: document.getElementById('cidadeCliente').value 
        }

        createClient(client)
    } 
}


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)