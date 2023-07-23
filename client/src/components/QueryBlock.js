import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/QueryBlock.css';

const QueryBlock = ({ listing_json }) => {

    const id = listing_json.Id;
    const title = listing_json.PropertyAddress; 
    const price = listing_json.Price;
    const date = "July 23rd 2023";
    const url = listing_json.PropertyURL; 
    const desc = listing_json.PublicRemarks.substring(0, 40) + "...";
    const imageUrl = listing_json.MedResPhotoURL;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

 
    const handleNext = () => {
        console.log(currentImageIndex);
        if (currentImageIndex < imageUrl.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    const handlePrevious = () => {
        console.log(currentImageIndex);
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }
    
    return (
        <div className="query-block-container" onClick={() => window.open(`https://realtor.ca${url}`, '_blank')}>
            <div className="query-block-title"> {title}  </div>
            <div className="query-content-wrapper">
                <div className="query-block-data">
                    <div className="query-block-price"> Price: {price}  </div>
                    <div className="query-block-date"> Date: {date}  </div>
                    <div className="query-block-info"> Description: {desc}</div>  
                </div>
                <div className="query-block-image-container">
                     <img src={imageUrl} 
                         alt="" 
                         className="query-block-image" 
                    />
                </div>
            </div>
        </div>
    );
};

export default QueryBlock;