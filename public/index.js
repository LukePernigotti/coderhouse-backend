// const { io } = require("socket.io-client");

const socket = io();

class Chat {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.email = wrapper.getElementsByClassName('js-chat__email')[0];
        this.messages = wrapper.getElementsByClassName('js-chat__messages')[0];
        this.textarea = wrapper.getElementsByClassName('js-chat__textarea')[0];
        this.sendButton = wrapper.getElementsByClassName('js-chat__send')[0];
        
        this.initChat();
    }
    
    initChat() {
        this.sendButton.addEventListener('click', (event) => {
            if (this.email.value) {
                this.sendMessage(event);
            }
        });

        socket.on('chat-server:loadMessages', messagesArray => {
            this.renderMessages(messagesArray);
        })

        socket.on('chat-server:newMessage', messagesArray => {
            this.renderMessages(messagesArray);
        })

    }

    renderMessages(messagesArray) {
        const messageMarkup = messagesArray.map(messageData => {
            const { email, message } = messageData;
            const date = new Date(messageData.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth()+1).toString();
            const year = date.getFullYear().toString();
            const hours = date.getHours().toString();
            const minutes = date.getMinutes().toString();
            const seconds = date.getSeconds().toString();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
            return `<p class="mb-1"><b class="text-primary">${email}</b> <span style="color: brown">${formattedDate}</span> : <i class="text-success">${message}</i></p>
            `
        });

        this.messages.innerHTML = messageMarkup.join(' ');
    }

    sendMessage(event) {
        event.preventDefault();
        
        const messageData = {
            email: this.email.value,
            message: this.textarea.value,
            date: new Date()
        }

        socket.emit('chat-client:newMessage', messageData);
    }
}

const chat = document.getElementsByClassName('js-chat')[0];
if (chat) {
    new Chat(chat);
}


class ProductsTable {
    constructor(table) {
        this.tbody = table.getElementsByClassName('js-products-table__body')[0];
        this.initProductsTable();
    }

    initProductsTable() {
        fetch('/products')
            .then(response => response.json())
            .then(data => {
                data.forEach(product => {
                    this.renderRows(product)
                });
            });

        socket.on('products-server:addProduct', product => {
            this.renderRows(product);
        });
    }

    renderRows(product) {
        const { id, title, price, thumbnail } = product;
        const markup = (
        `<th>${id}</th>
        <td>${title}</td>
        <td>$${price}</td>
        <td><img src="${thumbnail}" alt="${title}" width="20" height="20"/></td>
        <td><a href="/products/${id}" class="w-100 btn btn-sm btn-primary">View</a></td>`
        );

        const tr = document.createElement('tr');
        tr.innerHTML = markup;
        this.tbody.appendChild(tr);
    }
}

const productsTable = document.getElementsByClassName('js-products-table')[0];
if (productsTable) {
    new ProductsTable(productsTable);
}
