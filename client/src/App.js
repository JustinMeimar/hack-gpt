import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import ResponseContainer from './components/ResponseContainer';
import QueryBlock from './components/QueryBlock';

function App() {

    const [responses, setResponses ] = useState([]);
    const [queryBlocks, setQueryBlocks] = useState([]);    

    const updateChatLog = (prompt) => {
        setResponses([prompt, ...responses]);
    };

    const renderQueryBlocks = (response) => {
        //  response == three objects with: {
        //      title, price, area etc, more info (rest of JSON data dump)  
        //  }

        console.log("renderQueryBlocks:", response);
        const blocks = Object.values(response).map((property) => 
            <QueryBlock 
                key={property.title} 
                title={property.title}
                price={property.price}
                date={property.date}
                moreinfo={property.moreinfo}
                imageUrls={property.imageUrls}
            />
        );

        setQueryBlocks(blocks);
    }

    return (
        <div>
            <NavBar />
            <Container>
                <p>This is some basic structure for the app.</p>
                <h3>Welcome to the Dev Site</h3>
                <TextInput onSubmit={updateChatLog} renderQueryBlocks={renderQueryBlocks}/>  
                <ResponseContainer responses={responses}/>
                {queryBlocks}
            </Container>
            <Footer />
        </div>
    );
}

export default App;