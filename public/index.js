// const { io } = require("socket.io-client");

const socket = io();

const authorSchema = new normalizr.schema.Entity('author', {});
const messageSchema = new normalizr.schema.Entity('message', { author: authorSchema })
const messagesSchema = new normalizr.schema.Entity('messages', { messages: [messageSchema] })

class Chat {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.username = wrapper.getElementsByClassName('js-chat__username')[0];
        this.firstname = wrapper.getElementsByClassName('js-chat__firstname')[0];
        this.lastname = wrapper.getElementsByClassName('js-chat__lastname')[0];
        this.age = wrapper.getElementsByClassName('js-chat__age')[0];
        this.alias = wrapper.getElementsByClassName('js-chat__alias')[0];
        this.avatar = wrapper.getElementsByClassName('js-chat__avatar')[0];
        this.email = wrapper.getElementsByClassName('js-chat__email')[0];
        this.messages = wrapper.getElementsByClassName('js-chat__messages')[0];
        this.textarea = wrapper.getElementsByClassName('js-chat__textarea')[0];
        this.sendButton = wrapper.getElementsByClassName('js-chat__send')[0];
        
        this.initChat();
    }
    
    initChat() {
        this.sendButton.addEventListener('click', (event) => {
            if (this.email.value 
                && this.username.value 
                && this.firstname.value 
                && this.lastname.value 
                && this.age.value
                && this.alias.value
                && this.avatar.value) {
                this.sendMessage(event);
            }
        });

        socket.on('chat-server:loadMessages', messagesArray => {
            const messagesLength = JSON.stringify(messagesArray).length;
            const denormalizedMessages = normalizr.denormalize(messagesArray.result, messagesSchema, messagesArray.entities)
            const denormalizedMessagesLength = JSON.stringify(denormalizedMessages).length;
            const compressedPorcentage = parseInt((messagesLength * 100) / denormalizedMessagesLength)
            document.getElementsByClassName('js-chat__compression')[0].innerText = compressedPorcentage
            
            this.renderMessages(denormalizedMessages.messages);
        })

        socket.on('chat-server:newMessage', message => {
            const denormalizedMessages = normalizr.denormalize(message.result, messagesSchema, message.entities)
            this.renderMessages(denormalizedMessages.messages);
        })

    }

    renderMessages(messagesArray) {
        const fragment = new DocumentFragment();

        Array.from(messagesArray).map(messageData => {
            const { author, text } = messageData;
            const date = new Date(messageData.date);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth()+1).toString();
            const year = date.getFullYear().toString();
            const hours = date.getHours().toString();
            const minutes = date.getMinutes().toString();
            const seconds = date.getSeconds().toString();
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

            const img = document.createElement('img');
            img.width = 50;
            img.src = author.avatar;
            img.alt = `${author.id} avatar`;

            const p = document.createElement('p');
            p.classList.add('mb-1');
            p.innerHTML = `<b class="text-blue-500">${author.id}</b> <span class="text-yellow-900">${formattedDate}</span> : <i class="text-green-500">${text}</i>`;
            
            fragment.appendChild(img);
            fragment.appendChild(p);

            // return `<p class="mb-1"><b class="text-primary">${email}</b> <span style="color: brown">${formattedDate}</span> : <i class="text-success">${message}</i></p>
            // `
        });
        
        this.messages.appendChild(fragment);
    }

    sendMessage(event) {
        event.preventDefault();
        
        const messageData = {
            author: {
                id: this.email.value,
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                age: this.age.value,
                alias: this.alias.value,
                avatar: this.avatar.value
              },
            text: this.textarea.value,
            date: new Date()
        }

        socket.emit('chat-client:newMessage', messageData);
    }
}

// function makeHtmlList(messages) {
//     console.log('messages', messages);
//     return messages.map(mensaje => {
//         console.log('mensaje', mensaje);
//         return (`
//         <div>
//             <b style="color:blue;">${mensaje.author.id}</b> :
//             <i style="color:green;">${mensaje.text}</i>
//             <img width="50" src="${mensaje.author.avatar}" alt=" ">
//         </div>
//     `)
//     }).join(" ");
// }

const chat = document.getElementsByClassName('js-chat')[0];
if (chat) {
    new Chat(chat);
}


// class ProductsTable {
//     constructor(table) {
//         this.tbody = table.getElementsByClassName('js-products-table__body')[0];
//         this.initProductsTable();
//     }

//     initProductsTable() {
//         fetch('/api/products')
//             .then(response => response.json())
//             .then(data => {
//                 data.forEach(product => {
//                     this.renderRows(product)
//                 });
//             });

//         socket.on('products-server:addProduct', product => {
//             this.renderRows(product);
//         });
//     }

//     renderRows(product) {
//         const { id, title, price, thumbnail } = product;
//         const markup = (
//         `<th>${id}</th>
//         <td>${title}</td>
//         <td>$${price}</td>
//         <td><img src="${thumbnail}" alt="${title}" width="20" height="20"/></td>
//         <td><a href="/products/${id}" class="w-100 btn btn-sm btn-primary">View</a></td>`
//         );

//         const tr = document.createElement('tr');
//         tr.innerHTML = markup;
//         this.tbody.appendChild(tr);
//     }
// }

// const productsTable = document.getElementsByClassName('js-products-table')[0];
// if (productsTable) {
//     new ProductsTable(productsTable);
// }