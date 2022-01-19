// const { io } = require("socket.io-client");

const socket = io();

class Chat {
    constructor(wrapper) {
        this.username = wrapper.getElementsByClassName('js-chat__username')[0];
        this.messages = wrapper.getElementsByClassName('js-chat__messages')[0];
        this.textarea = wrapper.getElementsByClassName('js-chat__textarea')[0];
        this.sendButton = wrapper.getElementsByClassName('js-chat__send')[0];
        
        this.initChat();
    }
    
    initChat() {
        console.log('initChat', this.textarea);
        this.sendButton.addEventListener('click', this.sendMessage.bind(this));

        socket.on('chat-server:newMessage', messagesArray => {
            const messageMarkup = messagesArray.map(messageData => (
                `<p class="mb-1"><b>${messageData.username}:</b> ${messageData.message}</p>
                `
            ));

            this.messages.innerHTML = messageMarkup.join(' ');
        })
    }

    sendMessage() {
        const messageData = {
            username: this.username.value,
            message: this.textarea.value,
        }
        console.log('send message');

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
        console.log('this.tbody', this.tbody);
        this.initProductsTable();
    }

    initProductsTable() {
        socket.on('products-server:addProduct', product => {
            console.log('products-server:addProduct');
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
            console.log(tr);
            this.tbody.appendChild(tr);
        });
    }
}

const productsTable = document.getElementsByClassName('js-products-table')[0];
if (productsTable) {
    new ProductsTable(productsTable);
}
