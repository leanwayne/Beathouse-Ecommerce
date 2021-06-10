const randomNums = (num) =>{  
    const arr = []
    for (let index = 0; index < num; index++) {
        const myNumeroAleatorio = Math.floor(Math.random()*1000)+1
        arr.push(myNumeroAleatorio)
    }
    const obj = arr.reduce((acc, curr) => {
        if(typeof acc[curr] == 'undefined'){            
            acc[curr] = 1; 
        }else{
            acc[curr] += 1;
        }
        return acc; 
    }, {});
    return obj
}

//process.on('message', num =>{
//    const random = randomNums(num)
//    process.send(random)
//})
//descomentar para desafio 28!