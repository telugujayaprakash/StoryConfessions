
import React, { useContext } from "react";
import './Components.css';
import DataContext from '../context/DataContext';
import { useAuth } from '../context/DataContextProvider';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ onSearch }) {
    const location = useLocation();
    const isScreensPage = location.pathname.includes("/screens");
    const { categories } = useContext(DataContext);
    //new line
    const { currentUser, logout } = useAuth();
    //new login handler
    function handllogout(){
        
        const conform=window.confirm("do you want logout")
        if(conform){
            logout()
        }

    }


    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                    <section className='title-font font-medium items-center text-white mb-4 md:mb-0'>
                        <Link to={'/'} className='mr-8 hover:text-white'>Story Lines</Link>
                    </section>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        {!isScreensPage && (
                            <>
                                <Link to={'/'} className='mr-8 hover:text-white'>Home</Link>
                                <Link to={'/About-Us'} className='mr-8 hover:text-white'>About Us</Link>
                                <Link to={'/Contact'} className='mr-8 hover:text-white'>Contact</Link>
                                <Link to={'/upload'} className='mr-8 hover:text-white'>Upload Your Story</Link>
                                {/* start new line */}
                                {currentUser ? (
                                    <>
                                            <img src={currentUser.photoURL} alt="Profile" style={{ width: 30, height: 30, borderRadius: '50%' }}/>
                                        <button onClick={handllogout}>Logout</button>
                                    </>
                                ) : (
                                    <p style={{border:'1px solid white', borderRadius: '35%',padding:'5px' }}><Link to="/login">Login</Link></p> 
                                )}
                                {/*end new line */}
                            </>
                        )}
                        {isScreensPage && (
                            <div className='mr-8'>
                                <p>You are on a
                                    <input
                                        type="text"
                                        placeholder={categories}
                                        readOnly
                                        style={{ height: "auto", width: "80px" }}
                                        className="bg-gray-800 border border-gray-700 text-white rounded py-1 px-4"
                                    /> Category</p>
                            </div>
                        )}
                    </nav>
                </div>
            </header><hr />
        </>
    );
}

export default Navbar;
