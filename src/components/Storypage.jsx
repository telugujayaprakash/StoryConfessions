// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { firestore } from './firebase';
// import './Components.css';
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const StoryPage = () => {
//     const location = useLocation();
//     const { stdata } = location.state || {};
//     const [documentData, setDocumentData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [numPages, setNumPages] = useState(null);
//     const [pageNum, setPageNum] = useState(1);

//     useEffect(() => {
//         const fetchDocumentById = async () => {
//             if (!stdata) return;

//             try {
//                 const docRef = firestore.collection("horror").doc(stdata);
//                 const doc = await docRef.get();

//                 if (doc.exists) {
//                     setDocumentData(doc.data());
//                 } else {
//                     setDocumentData(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching document:", error);
//                 setDocumentData(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDocumentById();
//     }, [stdata]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     const nextPage = () => {
//         if (pageNum < numPages) {
//             setPageNum(pageNum + 1);
//         }
//     };

//     const prevPage = () => {
//         if (pageNum > 1) {
//             setPageNum(pageNum - 1);
//         }
//     };

//     return (
//         <div className="container mx-auto py-10">
//             <h1 className="text-4xl font-bold mb-4">Story Page</h1>
//             {documentData ? (
//                 <div className="mb-4">
//                     <h2 className="text-2xl font-semibold mb-2">{documentData.title}</h2>
//                     <img className="leading-relaxed mb-4" src={documentData.ImageUrl} alt="Story" />
//                     <p className="leading-relaxed mb-4">{documentData.story}</p>
//                     <div className="flex justify-center items-center flex-col">
//                         <div className="controls mb-4">
//                         </div>
//                         <div className="pdf-container">
//                             <Document file={documentData.pdf} onLoadSuccess={onDocumentLoadSuccess}>
//                                 <Page pageNumber={pageNum} renderTextLayer={false} renderAnnotationLayer={false} />
//                             </Document>

//                         </div>
//                         <div className="controls mb-4">
//                             <button
//                                 onClick={prevPage}
//                                 disabled={pageNum === 1}
//                                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
//                             >
//                                 Prev
//                             </button>
//                             <button
//                                 onClick={nextPage}
//                                 disabled={pageNum === numPages}
//                                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
//                             >
//                                 Next
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <p>No matching document found.</p>
//             )}
//         </div>
//     );
// };

// export default StoryPage;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Components.css';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const StoryPage = () => {
    const location = useLocation();
    const { story } = location.state || {};
    const [documentData, setDocumentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState(null);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        if (story) {
            setDocumentData(story);
            setLoading(false);
        } else {
            setDocumentData(null);
            setLoading(false);
        }
    }, [story]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNum < numPages) {
            setPageNum(pageNum + 1);
        }
    };

    const prevPage = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Story Page</h1>
            {documentData ? (
                <div className="mb-4">
                    <div className="flex justify-center items-center flex-col">
                        <div className="pdf-container">
                            <Document file={documentData.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNum} renderTextLayer={false} renderAnnotationLayer={false} />
                            </Document>
                        </div>
                        <div className="controls mb-4">
                            <button
                                onClick={prevPage}
                                disabled={pageNum === 1}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={pageNum === numPages}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No story data available.</p>
            )}
        </div>
    );
};

export default StoryPage;
