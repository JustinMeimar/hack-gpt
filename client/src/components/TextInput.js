import React, { useState } from 'react';
import '../css/TextInput.css';
import axios from 'axios'; // Import axios
import QueryBlock from './QueryBlock';

const mockResponse = {
    "property_1": {
        "title": "Riverside Front 4 Bedroom",
        "price": 690000,
        "date": "11/9/2023", 
        "moreinfo": {
            "hasHoa": true,
            "hoaFee": 115,
            "hoaFeeYn": true,
            "hoaFrequency": "Quarterly",
            "hoaName": "AVID PROPERTY MANAGEMENT",
            "squareFeet": 3125,
            "bedrooms": 4,
            "bathsTotalDecimal": 3.5,
            "fullBaths": 3,
            "halfBaths": 1,
            "garageSpaces": 2,
            "hasBasement": false,
            "hasGarage": true,
            "hasWaterfront": false,
        },
        "imageUrls":[
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/7.jpg?v=1",  
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/8.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/10.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/6.jpg?v=1",
        ],
    },
    "property_2": {
        "title": "Riverside Front 6 Bedroom",
        "price": 690000,
        "date": "11/9/2023", 
        "moreinfo": {
            "hasHoa": true,
            "hoaFee": 115,
            "hoaFeeYn": true,
            "hoaFrequency": "Quarterly",
            "hoaName": "AVID PROPERTY MANAGEMENT",
            "squareFeet": 3125,
            "bedrooms": 4,
            "bathsTotalDecimal": 3.5,
            "fullBaths": 3,
            "halfBaths": 1,
            "garageSpaces": 2,
            "hasBasement": false,
            "hasGarage": true,
            "hasWaterfront": false,
        },
        "imageUrls":[
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/7.jpg?v=1",  
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/8.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/10.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/6.jpg?v=1",
        ],
    }, 
    "property_3": {
        "title": "Riverside Front 4 Bedroom",
        "price": 690000,
        "date": "11/9/2023", 
        "moreinfo": {
            "hasHoa": true,
            "hoaFee": 115,
            "hoaFeeYn": true,
            "hoaFrequency": "Quarterly",
            "hoaName": "AVID PROPERTY MANAGEMENT",
            "squareFeet": 3125,
            "bedrooms": 4,
            "bathsTotalDecimal": 3.5,
            "fullBaths": 3,
            "halfBaths": 1,
            "garageSpaces": 2,
            "hasBasement": false,
            "hasGarage": true,
            "hasWaterfront": false,
        },
        "imageUrls":[
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/7.jpg?v=1",  
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/8.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/10.jpg?v=1",
            "https://photos.brivity.com/images/179/photo/1/6/6/2/2/6/5/6.jpg?v=1",
        ],
    },
};

const TextInput = ({ onSubmit, renderQueryBlocks }) => {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async () => {
        const response = await sendPrompt(); //process the prompt
        if (response) {
            onSubmit(response); 
            renderQueryBlocks(mockResponse);
            setInputValue(''); 
        } else {
            renderQueryBlocks(mockResponse);
            onSubmit("Error in prompt processing"); 
        }
    };
    
    const sendPrompt = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/prompt', {
                prompt: inputValue
            });
            const data = response.data.response
            return data
        } catch (error) {
            console.error('Error sending prompt:', error);
        }
    }
    
    return (
        <div>
        
            <div className="text-input-container">
            <button onClick={handleSubmit} className="submit-button">
                Submit
            </button>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input-textarea"
                placeholder="Write your prompt here..."
            /> 
        </div>
        </div>
        
    );
};

export default TextInput;