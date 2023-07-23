import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {

    return (
       <div> 
        <Navbar fixed="bottom" bg="light">
            <Container>
                <Navbar.Text>
                    Hack GPT 2023
                </Navbar.Text>
            </Container>
        </Navbar>
       </div>
    );
}

export default Footer;
