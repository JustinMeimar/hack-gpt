import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import ResponseContainer from './components/ResponseContainer';
import QueryBlock from './components/QueryBlock';
import AreaMap from './components/AreaMap';
import SlidingForm from './components/SlidingForm';
import ListingDetails from './components/ListingDetails';
import "./App.css";

const parse_json = (json) => {
    return {
        Id: json.Id || '',
        MlsNumber: json.MlsNumber || '',
        PublicRemarks: json.PublicRemarks || '',
        BathroomTotal: json?.Building?.BathroomTotal || '',
        Bedrooms: json?.Building?.Bedrooms || '',
        Price: json?.Property?.Price || '',
        PropertyAddress: json?.Property?.Address?.AddressText || '',
        PropertyURL: json.RelativeDetailsURL || '',
        MedResPhotoURL: json?.Property?.Photo?.[0]?.MedResPath || ''
    };
}

function App() {

    const [queryBlocks, setQueryBlocks] = useState([]);    
    const [responses, setResponses ] = useState([]);

    const updateChatResponse = (prompt) => {
        // setResponses([prompt, ...responses]);
        console.log("recieved the updated char response:", prompt);
        setResponses([prompt]);
    };
    
    const renderQueryBlocks = (response) => {
        
        console.log("In render query blocks", response);

        const top_listings = response["top-listings"];
        const newBlocks = Object.values(top_listings).map((listing) => 
            <QueryBlock 
                listing_json={parse_json(listing)} 
            />
        );

        setQueryBlocks(newBlocks);
    }
    return (
        <Router>
            <div className="app-container">
                <NavBar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <div className="site-title"> &#127968; Welcome to RealAI</div>
                            <div className="site-subtitle">Tell us about your search</div>
                            <SlidingForm /> 
                        </>
                    } />
                    <Route path="chat" element={
                        <>
                            <div className="site-title"> &#127968; Chat Section</div>
                            <div className="site-subtitle">Chat with the homes in your area</div>
                            
                            <div className="main-content-container"> 
                                <div className="query-blocks-container">
                                    {queryBlocks}
                                </div>  
                                <div className="area-map-container">
                                    <AreaMap/>
                                </div>
                            </div>
                            <ResponseContainer responses={responses} />
                            <TextInput updateChatResponse={updateChatResponse} renderQueryBlocks={renderQueryBlocks} />
                        </>
                    } />
                    
                    <Route path="/listing/:id" element={<ListingDetails title="testing tile"/>} />
                </Routes>
            </div>
        </Router>
    ); 
}

export default App;