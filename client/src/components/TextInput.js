import React, { useState } from 'react';
import '../css/TextInput.css';
import axios from 'axios'; // Import axios

const TextInput = ({ onSubmit }) => {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async () => {
        const response = await sendPrompt(); //process the prompt
        if (response) {
            onSubmit(response); 
            setInputValue(''); 
        } else {
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
        <div className="text-input-container">
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input-textarea"
                placeholder="Write your prompt here..."
            />
            <button onClick={handleSubmit} className="submit-button">
                Submit
            </button>
        </div>
    );
};

export default TextInput;