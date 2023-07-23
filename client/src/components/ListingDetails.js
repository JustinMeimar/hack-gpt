import React, { useState } from 'react';
import '../css/ListingDetails.css';
import { useLocation } from 'react-router-dom';

const ListingDetails = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const location = useLocation(); 
    const props = location.state.listing_json;

    const handleNext = () => {
        if (currentImageIndex < props.imageUrls.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    }

    const handlePrevious = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    }
   
    return (
        <div className="listing-details-container">
            <div className="listing-details-title"> {props.title}  </div>
            <div className="listing-content-wrapper">
                <div className="listing-details-data">
                    <div className="listing-details-price"> Price: ${props.price}  </div>
                    <div className="listing-details-date"> Date: {props.date}  </div>
                    <div className="listing-details-moreinfo"> More info: {props.moreInfo}  </div>
                </div>
                <div className="listing-details-image-container">
                     <img src={props.imageUrls && props.imageUrls[currentImageIndex]} 
                         alt="" 
                         className="listing-details-image" 
                    />
                </div>
            </div>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default ListingDetails;