import React from 'react';
import { useNavigate } from "react-router-dom";
function About() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/Contact");
      }
    return (
        <>
            <section class="text-gray-400 bg-gray-900 body-font"><hr />
                <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/>
                        <div class="text-center lg:w-2/3 w-full">
                            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">" A Micro Developer "</h1>
                            <p class="leading-relaxed mb-8">"Welcome to my corner of the web! I'm Jayaprakash, a frontend developer with a passion for crafting innovative websites that captivate and inspire. For me, web development isn't just a job it's a canvas where I bring ideas to life, blending creativity with functionality to create memorable online experiences."</p>
                            <p class="leading-relaxed mb-8">"Driven by my love for publishing, I thrive on the opportunity to share stories, ideas, and information in engaging ways. Whether it's through sleek designs, intuitive interfaces, or seamless user experiences, I strive to make every website I create a platform for meaningful connections and interactions."</p>
                            <p class="leading-relaxed mb-8">"Join me on this journey as we explore the endless possibilities of the digital realm. Let's collaborate, innovate, and together, let's make the web a more vibrant and dynamic place for all."</p>
                            <div class="flex justify-center">
                                
                                <button onClick={handleClick} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contact</button>
                            </div>
                        </div>
                </div>
            </section>
        </>
    );
}

export default About;
