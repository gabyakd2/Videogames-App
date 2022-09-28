import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { postGame, getGenres } from '../action'
import '../css/CreateGame.css'


function validate(input){
    let errors = {}
    if(!input.name) errors.name = 'Ingrese un nombre'
    if(!input.description) errors.description = 'El juego debe tener una descripción'
    if(!input.rating || input.rating < 1 || input.rating > 5) errors.rating = 'El rating debe ser entre 1 a 5'
    if(!input.released) errors.released = 'Debe tener fecha de lanzamiento'
    if(!input.platforms.length) errors.platforms = 'Ingrese las plataformas del videojuego' 
    return errors
}

export default function CreateGame(){
    const dispatch = useDispatch();
    const history = useHistory()
    const allGenres = useSelector(state => state.genre)

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    const [ input, setInput ] = useState({
        name: '',
        released: '',
        rating: '',
        platforms: '',
        genres: [],
        description: ''
    })
    const [errors, setErrors] = useState({})


    function handleChange(e){
        if(e.target.name === 'genres' || e.target.name === 'platforms'){
            setInput({
                ...input,
                [e.target.name]: [e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name]: e.target.value
            }))
        }
    }


    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        const errorSubmit = validate(input)
        if(Object.values(errorSubmit).length !== 0 || !input.genres.length){
            alert('Datos erroneos o faltantes')
        }else{
        dispatch(postGame(input))
        alert('¡Juego creado con exito!')
        setInput({
            name: '',
            released: '',
            rating: '',
            platforms: '',
            genres: [],
            description: ''
        })
        history.push('/home')
    }
    }


    function handleDelete(e){
        e.preventDefault()
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e.target.value)
        })
    }


    function handleSelectGenre(e) {
        if(!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
    }


    return(
        <div className='containerForm'>
            <div className='tittle'>
                <h1>CREA TU JUEGO</h1>
            </div>
            <div className='boxgrid'>
                <form className='formCreate'>
                    <input 
                    type="text" 
                    placeholder='Nombre de tu juego...'
                    className='inputsss'
                    name='name'
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='URL de la imagen...'
                    className='inputsss'
                    name='image'
                    value={input.image}
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="text" 
                    placeholder='Fecha de lanzamiento... Ej: 00/00/0000'
                    className='inputsss'
                    name='released'
                    value={input.released}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.released && (
                            <p>{errors.released}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='Rating...'
                    className='inputsss'
                    name='rating'
                    value={input.rating}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.rating && (
                            <p>{errors.rating}</p>
                        )
                    }
                    <input 
                    type="text" 
                    placeholder='Plataformas disponibles...'
                    className='inputsss'
                    name='platforms'
                    value={input.platforms}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.platforms && (
                            <p>{errors.platforms}</p>
                        )
                    }
                    <textarea 
                    type="text" 
                    placeholder='Descipción del juego...'
                    className='inputsss'
                    name='description'
                    value={input.description}
                    onChange={(e) => handleChange(e)}
                    />
                    {
                        errors.description && (
                            <p>{errors.description}</p>
                        )
                    }
                </form>
                <div className="generos">
                    <select className='selectGen' onChange={(e) => handleSelectGenre(e)}>
                        <option>Generos</option>
                        {
                            allGenres?.map((genre, i) => {
                                return (
                                    <option key={i} value={genre}>{genre}</option>
                                )
                            })
                        }
                    </select>
                    <div className='genresSelec'>
                        {
                            input.genres?.map(ge => (
                                <div className='genreX'>
                                    <p>{ge}</p>
                                    <br />
                                    <button className='butonX' value={ge} onClick={(e) => handleDelete(e)}>X</button>
                                </div>
                            ))
                        }
                        {
                            errors.genres && (
                                <p>{errors.genres}</p>
                                )
                            }   
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button className='buttonCrear' type='submit' onClick={(e) => handleSubmit(e)}>CREAR VIDEOJUEGO</button>
                <Link className='backBut' to='/home'>Volver</Link>
            </div>
        </div>

    )
}