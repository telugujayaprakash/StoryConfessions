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
                        <p className="leading-relaxed mb-3">Loading...</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Screens;
