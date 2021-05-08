const faker = require('faker')

faker.locale = 'es'

const getFakeProducts = () => ({
    nomre: faker.name.firstName(),
    precio: faker.finance.amount() ,
    foto: faker.image.imageUrl(),
})

module.exports = {getFakeProducts}