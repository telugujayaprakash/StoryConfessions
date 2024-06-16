import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore } from './firebase';

const StoryPage = () => {
    const location = useLocation();
    const { stdata } = location.state || {};
    const [documentData, setDocumentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocumentById = async () => {
            if (!stdata) return;

            try {
                const docRef = firestore.collection("horror").doc(stdata);
                const doc = await docRef.get();

                if (doc.exists) {
                    setDocumentData(doc.data());
                } else {
                    setDocumentData(null);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                setDocumentData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentById();
    }, [stdata]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Story Page</h1>
            {documentData ? (
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">{documentData.title}</h2>
                    <img className="leading-relaxed" src={documentData.ImageUrl}/>
                    <p className="leading-relaxed">{documentData.story}</p>
                    {/* Render other fields from the document as needed */}
                </div>
            ) : (
                <p>No matching document found.</p>
            )}
        </div>
    );
};

export default StoryPage;




