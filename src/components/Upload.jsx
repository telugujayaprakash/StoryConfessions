import React, { useState, useEffect } from 'react';
import { firestore, storage } from './firebase'; // Ensure Firebase is properly configured
import './Components.css';
import { useAuth } from '../context/DataContextProvider';
import { useNavigate } from "react-router-dom";

const StoryUpload = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [pdfFile, setPdfFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState([]);
    const [storyName, setStoryName] = useState('');
    const [storyImage, setStoryImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userStories, setUserStories] = useState([]); // Add state for user stories

    useEffect(() => {
        const fetchAvailableCategories = async () => {
            try {
                const collectionRef = firestore.collection('categories');
                const snapshot = await collectionRef.get();
                const docs = snapshot.docs.map(doc => doc.id);
                setAvailableCategories(docs);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchAvailableCategories();
    }, []);

    useEffect(() => {
        const fetchUserStories = async () => {
            if (currentUser) {
                try {
                    const categoriesRef = firestore.collection('categories');
                    const snapshot = await categoriesRef.get();
                    const stories = [];

                    snapshot.forEach(doc => {
                        const categoryStories = doc.data();
                        for (const [key, value] of Object.entries(categoryStories)) {
                            if (value.userId === currentUser.uid) {
                                stories.push({ id: key, category: doc.id, ...value });
                            }
                        }
                    });

                    setUserStories(stories);
                } catch (error) {
                    console.error("Error fetching user stories:", error);
                }
            }
        };

        fetchUserStories();
    }, [currentUser, success]); // Fetch user stories on mount and after a successful upload

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPdfFile(e.target.files[0]);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setStoryImage(e.target.files[0]);
        }
    };
    const gotologin = () => {
        navigate("/login");
    }

    if (!currentUser) {
        return <>
            <p>Please login to upload stories.</p>
            <button onClick={gotologin} style={{ backgroundColor: 'red', border: '2px solid red', borderRadius: '45%' }}> Login Page </button>
        </>;
    }


    const handleStoryUpload = async () => {
        if (userStories.length >= 10) {
            alert("You have reached the limit of 10 stories. Please contact developer.");
            return;
        }

        if (!storyName || !storyImage || !pdfFile || !selectedCategory) {
            setError("Please fill in all fields and upload all files.");
            return;
        }

        setUploading(true);
        setError('');
        setSuccess(false);

        try {
            const storageRef = storage.ref();

            // Upload story image
            const imageRef = storageRef.child(`/${selectedCategory}/${storyImage.name}`);
            await imageRef.put(storyImage);
            const imageUrl = await imageRef.getDownloadURL();

            // Upload PDF file
            const fileRef = storageRef.child(`/${selectedCategory}/${pdfFile.name}`);
            await fileRef.put(pdfFile);
            const fileUrl = await fileRef.getDownloadURL();

            // Prepare story details
            const storyData = {
                name: storyName,
                image: imageUrl,
                pdf: fileUrl,
                userId: currentUser.uid,
            };

            // Save story details in the 'categories' collection
            await firestore.collection('categories').doc(selectedCategory).update({
                [storyName]: storyData
            });

            setSuccess(true);
            setStoryName('');
            setStoryImage(null);
            setPdfFile(null);
            setSelectedCategory('');
        } catch (error) {
            console.error("Error uploading story details:", error);
            setError("Error uploading story details.");
        } finally {
            setUploading(false);
        }
    };

    //to delete stories
    const handleDeleteStory = async (storyId, category) => {
        if (window.confirm("Are you sure you want to delete this story?")) {
            try {
                const storyRef = firestore.collection('categories').doc(category);

                // Retrieve the document data
                const doc = await storyRef.get();
                const data = doc.data();

                // Remove the story field from the data object
                delete data[storyId];

                // Update the document with the modified data
                await storyRef.set(data);

                // Remove the story from storage
                const story = userStories.find(story => story.id === storyId && story.category === category);
                if (story) {
                    const imageRef = storage.refFromURL(story.image);
                    const pdfRef = storage.refFromURL(story.pdf);
                    await imageRef.delete();
                    await pdfRef.delete();
                }

                setUserStories(userStories.filter(story => !(story.id === storyId && story.category === category)));
            } catch (error) {
                console.error("Error deleting story:", error);
                alert("Error deleting story. Please try again.");
            }
        }
    };

    

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Upload Your Story</h1>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Story uploaded successfully!</p>}

            <div className="mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded"
                >
                    <option value="" disabled>Select Category</option>
                    {availableCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={storyName}
                    onChange={(e) => setStoryName(e.target.value)}
                    placeholder="Story Name"
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />
            </div>
            <div className="mb-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mb-4"
                />
            </div>
            <button
                onClick={handleStoryUpload}
                disabled={uploading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {uploading ? "Uploading..." : "Upload Story"}
            </button>

            {/* Render user uploaded stories */}
            <h2 className="text-3xl font-bold mb-4 mt-10">Your Uploaded Stories</h2>
            {userStories.length > 0 ? (
                <ul>
                    {userStories.map(story => (
                        <li key={story.id} className="mb-4">
                            <div>
                                <h3 className="text-2xl">{story.name}</h3>
                                <img src={story.image} alt={story.name} className="w-32 h-32 object-cover" />
                                {story.pdf && (
                                    <div>
                                        <a href={story.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                            View PDF
                                        </a>
                                    </div>
                                )}
                                <button
                                    onClick={() => handleDeleteStory(story.id, story.category)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                                >
                                    Delete Story
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No stories uploaded yet.</p>
            )}
        </div>
    );
};

export default StoryUpload;
