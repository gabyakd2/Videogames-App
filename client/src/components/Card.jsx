import React from 'react'
import '../css/Card.css'
import estrella from '../css/imagensearch/estrella.png'


export default function Card({image, name, genres, rating}){
    return (
        <div className='card'>
            <img className='imgbig' src={image} alt="imgcard" width='380px' height='250px' />
            <div className="contenido">
                <h3>{name}</h3>
                <h4>Generos: {genres}</h4>
                <div className='ratinglog'>
                    <p>{rating}</p>
                    <img src={estrella} alt="logorating"/>
                </div>
            </div>           
        </div>
    )
}