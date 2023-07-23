import React from 'react';
import '../css/ResponseContainer.css';  /* Make sure to uncomment the CSS import */
import userIcon from '../images/user-icon.png';

const iconDimension = "40px" 

const ResponseContainer = ({ responses }) => {
    
    const reversed_responses = [...responses].reverse();
    
    return (
        <div className="response-container">
            {reversed_responses.map((response, index) => (
                <div key={index} className="response-item">
                    <div className='response-icon'>
                        <img src={userIcon} alt="user" height={iconDimension} width={iconDimension} ></img>
                    </div>
                    {response}
                </div>
            ))}
        </div>
    );
};

export default ResponseContainer;