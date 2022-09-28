import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGameByQuery } from '../action'
import '../css/SearchBar.css'
import searchimg from '../css/imagensearch/searchimg.png'



export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const allVg = useSelector(state => state.allVideogames)

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        const gameFilter = allVg.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()))
        if(name && (!gameFilter || gameFilter.length === 0)){
            alert('No existe el juego ingresado!')
        }
        
        else if(!name){
            alert('¡Para buscar ingrese un nombre!')
        }
        else{
            dispatch(filterGameByQuery(name))
            setName('')
            setCurrentPage(1)
        }
    }

    return(
        <div className='princ'>
            <div className="topnav">
                <input 
                type="text"
                placeholder='Buscar juego...'
                onChange={e => handleInputChange(e)}
                value={name}
                />
                <img src={searchimg} alt='logobuscar' className='logobuscar' onClick={e => handleSubmit(e)} type='submit'/>
            </div>
        </div>
    )
}