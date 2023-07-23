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
                listing_json={property.listing_json} 
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
                    
                    <Route path="/listing/1" element={<ListingDetails PropertyAddress="#101 10160 83 AV NW|Edmonton, Alberta T6E2C4" price="25000" MedResPhotoURL="https://cdn.realtor.ca/listings/TS638193550144800000/reb10/medres/4/E4339894_1.jpg" moreInfo="WALKABLE STRATHCONA CONDO! Amazing value just steps from the FARMERS MARKET, RIVER VALLEY, WHYTE AVE, and the UNIVERSITY of ALBERTA. This unit is south facing and enjoys tons of natural sunlight. The open concept living room is generously sized and features durable upgraded flooring in fabulous condition. The space opens gracefully to the dining area with views of the mature trees to the south of the building. Next, is the kitchen with stainless steel appliances, tons of cabinetry, and quartz countertops. Down the hall there is a great storage area, IN-SUITE LAUNDRY, front hall closet, and full bathroom. Two sunny bedrooms with south facing windows complete the unit. Also included is covered, powered parking. This is the perfect home for a students, professional couples, those who love to be able to walk to excellent restaurants, bars & natural areas, or an investor! Most of your utilities are already included in the condo fee. (29912100)"/>} />
                </Routes>

                {/* <Footer /> */}
            </div>
        </Router>
    ); 
}

export default App;