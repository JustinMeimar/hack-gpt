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

function App() {

    const [queryBlocks, setQueryBlocks] = useState([]);    
    const [responses, setResponses ] = useState([]);

    const updateChatResponse = (prompt) => {
        // setResponses([prompt, ...responses]);
        setResponses([prompt]);
    };
    
    const renderQueryBlocks = (response) => {

        console.log("renderQueryBlocks:", response);
        const newBlocks = Object.values(response).map((property) => 
            <QueryBlock 
                key={property.title} 
                title={property.title}
                price={property.price}
                date={property.date}
                moreinfo={property.moreinfo}
                imageUrls={property.imageUrls}
            />
        );

        setQueryBlocks([...newBlocks, ...queryBlocks]);
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
                            <div className="site-subtitle">Tell us about your search</div>
                            
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
                    <Route path="/chat/:title" element={<ListingDetails />} />
                </Routes>

                {/* <Footer /> */}
            </div>
        </Router>
    ); 
}

export default App;