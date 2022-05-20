'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Calebe",
    email: "fcalebe@gmail.com",
    celular: "11123456789",
    cidade: "Goiânia"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

// CRUD - create read update delete


// CRUD - CREATE
const createClient = (client) => {
    const db_client = getLocalStorage()
    db_client.push(client)
    setLocalStorage(db_client)
}


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)