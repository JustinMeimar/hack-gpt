import React, { useState } from 'react';
import '../css/TextInput.css';

const TextInput = ({ onSubmit }) => {

    const [inputValue, setInputValue] = useState('');
    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue(''); 
    };

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