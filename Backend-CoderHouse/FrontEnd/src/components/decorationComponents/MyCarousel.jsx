import React, {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem'

const MyCarousel = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/carousel/getItems', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {setItems(data)})
        .catch((err) =>{
            console.log('algo salio mal', err)
        })         
    }, [])

    return (
        <Carousel animation='slide'>
            {items.map( (item, i) => <CarouselItem key={i} item={item}/> )}
        </Carousel>
    )
}

export default MyCarousel