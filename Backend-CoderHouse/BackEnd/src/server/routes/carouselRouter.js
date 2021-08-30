const express = require('express')
const router = express.Router()
const carouselController = require('../controllers/carouselController')
const {upload} = require('../../utils/multer/multer')

router.get('/getItems', carouselController.getCarouselItems)
router.post('/uploadItem', upload.single('image') ,carouselController.uploadCarouselItem)

module.exports = router