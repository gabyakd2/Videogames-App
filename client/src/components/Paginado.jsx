import React from "react";
import '../css/Paginado.css'


export default function Paginado({gamePerPage, allVideogames, paginado}){
    const pageNumber = []
    for (let i = 1 ; i <= Math.ceil(allVideogames / gamePerPage) ; i++){
        pageNumber.push(i)
    }
    return(
        <nav className="paginado">
            <ul className="ulPaginado">
                {
                    pageNumber?.map(number => (
                        <li className="numeroPaginado" onClick={() => paginado(number)} key={number}>{number}</li>
                    ))
                }
            </ul>
        </nav>
    )
}