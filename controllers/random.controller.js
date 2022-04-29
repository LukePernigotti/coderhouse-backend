const randomNumber = (min, max) => parseInt(Math.random() * max) + min;

function randomCalc(data) {
    const results = {};
    
    const quantity = data.quantity || 100000000;
    for (let index = 0; index < quantity; index++) {   
        const number = randomNumber(1, 2000);
        if (!results[number]) results[number] = 1;
        else results[number] = results[number] + 1;
    }

    process.send(results);
}

process.on('message', (quantity) => {
    randomCalc(quantity)
})