import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameByParams, cleanDetail } from '../action'
import { useEffect } from "react";
import '../css/Detail.css'




export default function Detail(id){
    const dispatch = useDispatch();
    const videogames = useSelector(state => state.detail)
    console.log(videogames)

    useEffect(() =>{
        dispatch(getGameByParams(id))
    },[dispatch])

    useEffect(() => {
        return function () {
            dispatch(cleanDetail())
        }
    },[dispatch])


    return(
        <div className="contPri">
            {
                videogames && videogames.name ?
                <div>
                    <button className="buttonBack"><Link className="linkBack" to='/home'>Volver</Link></button>
                    <div className="conTotal">
                        <div className="imgDesc">
                            <h1>{videogames.name}</h1>
                            <p><h2>Descripción:</h2> {videogames.description}</p>
                        </div>
                        <div className="infoGame">
                            <img src={videogames.image} alt="logoimg" />
                            <div className="infoRest">
                                <h3>Plataformas: {videogames.platforms ? videogames.platforms + ' ': 'no hay nada'}</h3>
                                <br />
                                <h3>Generos: {videogames.genres ? videogames.genres.map(e => e.name) + ' ' : videogames.types + ' ' }</h3>
                                <br />
                                <h4>Rating: {videogames.rating}</h4>
                                <br />
                                <h4>Fecha de lanzamiento: {videogames.released}</h4>
                            </div>
                        </div>
                    </div>
                </div> : (
                    <div className="loadkra">
                        <img src="https://c.tenor.com/W0wAOVqYANYAAAAj/kratos.gif" alt="logoload" />
                    </div>
                )
            }
        </div>
    )
}