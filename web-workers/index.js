const 
    button = document.querySelector('.button'),
    input  = document.querySelector('.input'),
    input2 = document.querySelector('.input2');

let 
    intervalValue = 0;

const worker = new Worker('webworker.js');

const start = () => {
    worker.postMessage('start');
    input.value = 'Loading...';
    button.disabled = true;
};

worker.addEventListener('message', (e) => {
    const { data } = e;

    input.value = data;
    button.disabled = false;
});

button.addEventListener('click', start);

setInterval(() => { // вычисления воркера не будут блокировать основной поток
    input2.value = ++intervalValue;
}, 100);