import React from 'react';
import './Components.css'
import '../index.css'
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <>
            <header class="text-gray-400 bg-gray-900 body-font">
                <div class="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
                    {/* <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        
                        <span class="ml-3 text-xl">Tailblocks</span>
                    </a> */}
                    <section className='title-font font-medium items-center text-white mb-4 md:mb-0'>
                        <h4>TalesofTorrnado</h4>
                    </section>
                    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to={'/'} className='mr-8 hover:text-white'>Home</Link>
                        <Link to={'About-Us'} className='mr-8 hover:text-white'>About Us</Link>
                        <Link to={'Contact'} className='mr-8 hover:text-white'>Contact</Link>
                        {/* <Link to={'Upload'} className='mr-8 hover:text-white'>uplaod</Link> */}
                    </nav>
                </div>
            </header><hr />
            {/* <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand">Navbar</a>
                    <div className="d-flex gap-5">
                        <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                        <Link to={'About-Us'} className="nav-link">About Us</Link>
                        <Link to={'Contact'} className="nav-link">Contact</Link>
                    </div>
                </div>
            </nav> */}
        </>
    )
}

export default Navbar;