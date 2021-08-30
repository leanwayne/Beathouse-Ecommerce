const model = require("./modelSchema")

module.exports= {
    getCarouselItems: async () => {
        const carouselItems = await model.carouselItems.find({}).sort({title: 1})
        return carouselItems
    },

    uploadCarouselItem: async (carouselItem) => await model.carouselItems.insertMany(carouselItem),
}