import React from 'react'
import { Link } from 'react-router-dom'
import '../css/LandingPage.css'


export default function LandingPage() {
    return (
        <section className="contLan">
            <div className='segCont'>
                <div className="terCont">
                    <h1 className='tituloLan'>GamePedia</h1>
                    <Link to='/home' className='link'>INGRESAR</Link>
                </div>
            </div>
        </section>
    )
}