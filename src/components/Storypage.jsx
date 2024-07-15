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

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">Story Page</h1>
            {documentData ? (
                <div className="mb-4">
                    <div className="flex justify-center items-center flex-col">
                        <div className="pdf-container">
                            <Document file={documentData.pdf} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} renderAnnotationLayer={false} />
                                ))}
                            </Document>
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
