import React, { useState, useEffect } from 'react';
import '../css/QueryBlock.css';

const QueryBlock = ({ title, price, date, moreInfo, imageUrls }) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        console.log(currentImageIndex);
        if (currentImageIndex < imageUrls.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    const handlePrevious = () => {
        console.log(currentImageIndex);
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }
  
    console.log("in QueryBlock:", imageUrls);

    return (
        <div className="query-block-container">
            <div className="query-block-title"> {title}  </div>
            <div className="query-content-wrapper">
                <div className="query-block-data">
                    <div className="query-block-price"> Price: ${price}  </div>
                    <div className="query-block-date"> Date: {date}  </div>
                    <div className="query-block"> More info: {moreInfo}  </div>
                </div>
                <div className="query-block-image-container">
                    
                    <button onClick={handlePrevious}>Previous</button>
                    <button onClick={handleNext}>Next</button>
                    <img src={imageUrls && imageUrls[currentImageIndex]} 
                         alt="" 
                         className="query-block-image" 
                    />
                </div>
            </div>
        </div>
    );
};

export default QueryBlock;