import React, { useContext, useState, useEffect } from "react";
// import Hrr from '../assets/hrror.webp'
// import Kingdom from '../assets/kingdom.webp'
// import Psycho from '../assets/psycho.webp'
// import Romantic from '../assets/romantic.webp'
// import Adven from '../assets/adven.webp'
// import Scifi from '../assets/sci-fi.webp'
// import { Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import { firestore } from "./firebase";
function Screens() {
    const { categories } = useContext(DataContext);
    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
        const fetchCategoryData = async (category) => {
            try {
                const docRef = firestore.collection("categories").doc(category);
                const doc = await docRef.get();
                if (doc.exists) {
                    setDocumentData(doc.data());
                } else {
                    setDocumentData(null);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                setDocumentData(null);
            }
        };
        fetchCategoryData(categories);
    }, [categories]);

    return (
        <section className="text-gray-400 bg-gray-900 body-font">
            <div className="container px-5 py-20 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {documentData ? (
                        Object.entries(documentData).map(([key, value]) => (
                            <div className="p-4" key={key}>
                                <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={''} alt="blog" />
                                    <div className="p-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY</h2>
                                        <h1 className="title-font text-lg font-medium text-white mb-3">{categories}</h1>
                                        <p className="leading-relaxed mb-3">{value}</p>
                                        <div className="flex items-center flex-wrap">
                                            <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-800">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>1.2K
                                            </span>
                                            <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                                                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </span>
                                        </div>
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