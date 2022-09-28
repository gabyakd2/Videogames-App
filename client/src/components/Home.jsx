import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideogame, getGenres, filterByGenre, orderByName, orderByRating, filterByCreatedOrExist } from '../action'
import SearchBar from './SearchBar'
import Card from './Card'
import Paginado from './Paginado'
import '../css/Home.css'



export default function Home() {
    const dispatch = useDispatch()

    const allVideogames = useSelector(state => state.videogames);
    const allGenre = useSelector(state => state.genre);
    const [orden, setOrden] = useState('')
    const [rating, setRating] = useState('')

    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [gamePerPage, setGamePerPage] = useState(15)
    const indexOfLastGame = currentPage * gamePerPage
    const indexOfFirstGame = indexOfLastGame - gamePerPage
    const currentGame = allVideogames.slice(indexOfFirstGame, indexOfLastGame)

    function paginado(pageNumber) {
        setCurrentPage(pageNumber)
    }
    //Paginado/


    useEffect(() => {
        dispatch(getVideogame())
        dispatch(getGenres())
    }, [dispatch])


    function handleLoadAllGames(e) {
        dispatch(getVideogame())
    }

    function handleFilterByGenre(e) {
        e.preventDefault()
        if (e.target.value === 'all') {
            dispatch(getVideogame())
        } else {
            dispatch(filterByGenre(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleOrderByName(e) {
        if (e.target.value === 'all') {
            dispatch(getVideogame())
        } else {
            e.preventDefault();
            dispatch(orderByName(e.target.value))
            setCurrentPage(1)
            setOrden(`('Ordenado', ${e.target.value})`)
        }
    }

    function handleOrderByRating(e) {
        if (e.target.value === 'all') {
            dispatch(getVideogame())
        } else {
            e.preventDefault();
            dispatch(orderByRating(e.target.value))
            setCurrentPage(1)
            setRating(`('Ordenado', ${e.target.value})`)
        }
    }

    function handleFilterCreatedOrExist(e) {
        dispatch(filterByCreatedOrExist(e.target.value))
        setCurrentPage(1)
    }

    return (
        <div className='containerPri'>
            <div className='navBar'>
                <h1>GAMEPEDIA</h1>
                <Link className='linkHome' to='/create'>Crea tu videojuego</Link>
                <button className='botonCargar' onClick={e => handleLoadAllGames(e)}>Cargar todos los juegos</button>
                <SearchBar setCurrentPage={setCurrentPage} />
            </div>

            <div>
                <h2 className='filtrarJuegos'>Filtrar Juegos</h2>
                <div className='contSelects'>
                    <select className='selects' onChange={e => handleOrderByName(e)}>
                        <option value='all'>Todos</option>
                        <option value='asc'>A - Z</option>
                        <option value='desc'>Z - A</option>
                    </select>

                    <select className='selects' onChange={(e) => handleFilterByGenre(e)}>
                        <option value='all'>Todos los juegos</option>
                        {
                            allGenre.map((genre, i) => {
                                return (
                                    <option key={i}>{genre}</option>
                                )
                            })
                        }
                    </select>

                    <select className='selects' onChange={e => handleFilterCreatedOrExist(e)}>
                        <option value='all'>Todos</option>
                        <option value='api'>Existentes</option>
                        <option value='created'>Creados</option>
                    </select>

                    <select className='selects' onChange={e => handleOrderByRating(e)}>
                        <option value='all'>Todos los puntos</option>
                        <option value='desc'>Mayor rating</option>
                        <option value='asc'>Menor rating</option>
                    </select>

                </div>
                <Paginado
                    gamePerPage={gamePerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                />
                <br />
            

                <div className='countainerCards'>
                    {
                        currentGame.length > 0 ? currentGame.map((g, i) => {
                            return (
                                <div key={i}>
                                    <Link to={'/videogame/' + g.id} className='cardlink'>
                                        <Card image={g.image} name={g.name} genres={g.types ? g.types + ' ' : g.genres.map(e => e.name) + ' '} rating={g.rating}/>
                                    </Link>
                                </div>
                            )
                        }) : (
                            <div className='loading'>
                                <img className='perro' src="https://c.tenor.com/W0wAOVqYANYAAAAj/kratos.gif" alt="logoload" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}