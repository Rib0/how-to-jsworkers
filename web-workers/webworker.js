this.addEventListener('message', (e) => {
    const array = Array.from(new Array(Math.round((100000000 * Math.random()))).keys());

    const sumOf2xMupltiplyArray = array.reduce((acc, cur) => {
        return acc + cur * 2
    }, 0)

    this.postMessage(sumOf2xMupltiplyArray)
})