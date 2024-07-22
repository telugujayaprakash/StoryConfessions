import './Components.css';
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from '../context/DataContext';
import { firestore } from "./firebase";
import SearchBox from './Search'; // Import the SearchBox component

function Screens() {
    const navigate = useNavigate();
    const { categories } = useContext(DataContext);
    const [stories, setStories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const categoryRef = firestore.collection("categories").doc(categories);
                const doc = await categoryRef.get();

                if (doc.exists) {
                    const data = doc.data();
                    const storyEntries = Object.entries(data).map(([key, value]) => ({
                        key,
                        name: value.name || "Untitled",
                        image: value.image || "",
                        pdf: value.pdf || ""
                    }));

                    setStories(storyEntries);
                } else {
                    setStories([]);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                setStories([]);
            }
        };

        fetchCategoryData();
    }, [categories]);

    const handleNavigate = (story) => {
        navigate("/Storypage", { state: { story } });
    };

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setSearchResults([]);
            setNotFound(false);
            return;
        }

        const results = stories.filter(({ name }) =>
            name && name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (results.length > 0) {
            setSearchResults(results);
            setNotFound(false);
        } else {
            setSearchResults([]);
            setNotFound(true);
        }
    };

    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <p className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <SearchBox onSearch={handleSearch} />
            </p>
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {searchResults.length > 0 ? (
                        searchResults.map(({ key, name, image }) => (
                            <div className="p-4" key={key}>
                                <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image} alt={name} />
                                    <div className="p-6">
                                        <p className="leading-relaxed mb-3 text-center">{name}</p>
                                        <button onClick={() => handleNavigate({ name, image, pdf: stories.find(story => story.key === key).pdf, category: categories })}>
                                            R E A D-N O W
                                            <div id="clip">
                                                <div id="leftTop" className="corner"></div>
                                                <div id="rightBottom" className="corner"></div>
                                                <div id="rightTop" className="corner"></div>
                                                <div id="leftBottom" className="corner"></div>
                                            </div>
                                            <span id="rightArrow" className="arrow"></span>
                                            <span id="leftArrow" className="arrow"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : notFound ? (
                        <p className="leading-relaxed mb-3">Not found</p>
                    ) : stories.length > 0 ? (
                        stories.map(({ key, name, image }) => (
                            <div className="p-4" key={key}>
                                <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={image} alt={name} />
                                    <div className="p-6">
                                        <p className="leading-relaxed mb-3 text-center">{name}</p>
                                        <button onClick={() => handleNavigate({ name, image, pdf: stories.find(story => story.key === key).pdf, category: categories })}>
                                            R E A D-N O W
                                            <div id="clip">
                                                <div id="leftTop" className="corner"></div>
                                                <div id="rightBottom" className="corner"></div>
                                                <div id="rightTop" className="corner"></div>
                                                <div id="leftBottom" className="corner"></div>
                                            </div>
                                            <span id="rightArrow" className="arrow"></span>
                                            <span id="leftArrow" className="arrow"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div class="text-center">
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Screens;
