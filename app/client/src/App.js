import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import ResponseContainer from './components/ResponseContainer';

function App() {

    const [responses, setResponses ] = useState([]);
    
    const handleNewPrompt = (prompt) => {
        setResponses([prompt, ...responses]);
    };

    return (
        <div>
            <NavBar />
            <Container>
                <h3>Welcome to the Dev Site</h3>
                <p>This is some basic structure for the app.</p>
                <ResponseContainer responses={responses}/>
                <TextInput onSubmit={handleNewPrompt}/> 
            </Container>
            <Footer />
        </div>
    );
}

export default App;