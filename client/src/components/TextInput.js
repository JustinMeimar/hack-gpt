import React, { useState } from 'react';
import '../css/TextInput.css';
import axios from 'axios'; // Import axios
import { useLocation } from 'react-router-dom';
import QueryBlock from './QueryBlock';

const realMockResponse = {
    "Id":"25580028",
    "MlsNumber":"E4340224",
    "PublicRemarks":"Professionals, students & investors rejoice! This renovated top flr 1 bdrm 1 bath condo offers a modern lifestyle in the convenient & mature neighborhood of GARNEAU! Walk to work, University, Whyte Ave or the river valley - everything awesome Edmonton has to offer is at your fingertips! Pet friendly CONCRETE BUILDING boasting city streetscape views with private deck. IN SUITE LAUNDRY! Heated titled underground stall.  Visitor parking right behind the building gives your visitors easy carefree convenience. Included furnishings means premium rents for investors, or just bring your suitcase for students.  The University of Alberta Hospital is just a short walk away (5 minutes). Proximity to amenities like Kinsmen Recreation Centre, LRT, Safeway, H-mart and too many restaurants to name also make this an ideal place to live. It doesn't get any better than this! (29920252)",
    "Building":{
        "BathroomTotal":"1",
        "Bedrooms":"1",
        "SizeInterior":"67.38 m2",
        "StoriesTotal":"",
        "Type":"Apartment"
    },
    "Individual":[
        {
            "IndividualID":1478604,
            "Name":"Brent MacIntosh",
            "Organization":{
                "OrganizationID":67130,
                "Name":"RE\/MAX River City",
                "Logo":"https:\/\/cdn.realtor.ca\/organization\/en-CA\/TS638248485900000000\/lowres\/1004972.jpg",
                "Address":{
                    "AddressText":"100-10328 81 Ave NW|Edmonton, Alberta T6E1X2",
                    "PermitShowAddress":true,
                    "DisseminationArea":null
                },
                "Phones":[
                    {
                        "PhoneType":"Telephone",
                        "PhoneNumber":"439-7000",
                        "AreaCode":"780",
                        "PhoneTypeId":"1"
                    },
                    {
                        "PhoneType":"Fax",
                        "PhoneNumber":"439-7248",
                        "AreaCode":"780",
                        "PhoneTypeId":"4"
                    }
                ],
                "Emails":[
                    {
                        "ContactId":"511516328"
                    }
                ],
                "OrganizationType":"Firm",
                "HasEmail":true,
                "PermitFreetextEmail":true,
                "PermitShowListingLink":true,
                "RelativeDetailsURL":"\/office\/firm\/67130\/remax-river-city-100-10328-81-ave-nw-edmonton-alberta-t6e1x2",
                "PhotoLastupdate":"2023-07-13 12:36:30 PM"
            },
            "Phones":[
                {
                    "PhoneType":"Telephone",
                    "PhoneNumber":"464-0075",
                    "AreaCode":"780",
                    "PhoneTypeId":"1"
                },
                {
                    "PhoneType":"Fax",
                    "PhoneNumber":"439-7248",
                    "AreaCode":"780",
                    "PhoneTypeId":"4"
                }
            ],
            "Websites":[
                {
                    "Website":"https:\/\/www.macintoshgroup.ca\/",
                    "WebsiteTypeId":"1"
                },
                {
                    "Website":"https:\/\/www.facebook.com\/TheMacIntoshGroup\/",
                    "WebsiteTypeId":"2"
                },
                {
                    "Website":"https:\/\/www.instagram.com\/macintoshgroup\/",
                    "WebsiteTypeId":"5"
                },
                {
                    "Website":"https:\/\/www.youtube.com\/user\/brentmacintosh",
                    "WebsiteTypeId":"7"
                }
            ],
            "Emails":[
                {
                    "ContactId":"517384477"
                }
            ],
            "Photo":"https:\/\/cdn.realtor.ca\/individual\/TS636044398800000000\/lowres\/1011515.jpg",
            "Position":"Associate",
            "PermitFreetextEmail":true,
            "FirstName":"Brent",
            "LastName":"MacIntosh",
            "CorporationDisplayTypeId":"0",
            "PermitShowListingLink":true,
            "RelativeDetailsURL":"\/agent\/1478604\/brent-macintosh-100-10328-81-ave-nw-edmonton-alberta-t6e1x2",
            "AgentPhotoLastUpdated":"2016-07-18 11:58:00",
            "PhotoHighRes":"https:\/\/cdn.realtor.ca\/individual\/TS636044398800000000\/highres\/1011515.jpg",
            "RankMyAgentKey":"",
            "RealSatisfiedKey":"",
            "TestimonialTreeKey":""
        },
        {
            "IndividualID":1863975,
            "Name":"Stephen A. Koehn",
            "Organization":{
                "OrganizationID":67130,
                "Name":"RE\/MAX River City",
                "Logo":"https:\/\/cdn.realtor.ca\/organization\/en-CA\/TS638248485900000000\/lowres\/1004972.jpg",
                "Address":{
                    "AddressText":"100-10328 81 Ave NW|Edmonton, Alberta T6E1X2",
                    "PermitShowAddress":true,
                    "DisseminationArea":null
                },
                "Phones":[
                    {
                        "PhoneType":"Telephone",
                        "PhoneNumber":"439-7000",
                        "AreaCode":"780",
                        "PhoneTypeId":"1"
                    },
                    {
                        "PhoneType":"Fax",
                        "PhoneNumber":"439-7248",
                        "AreaCode":"780",
                        "PhoneTypeId":"4"
                    }
                ],
                "Emails":[
                    {
                        "ContactId":"511516328"
                    }
                ],
                "OrganizationType":"Firm",
                "HasEmail":true,
                "PermitFreetextEmail":true,
                "PermitShowListingLink":true,
                "RelativeDetailsURL":"\/office\/firm\/67130\/remax-river-city-100-10328-81-ave-nw-edmonton-alberta-t6e1x2",
                "PhotoLastupdate":"2023-07-13 12:36:30 PM"
            },
            "Phones":[
                {
                    "PhoneType":"Telephone",
                    "PhoneNumber":"439-7000",
                    "AreaCode":"780",
                    "PhoneTypeId":"1"
                },
                {
                    "PhoneType":"Fax",
                    "PhoneNumber":"439-7248",
                    "AreaCode":"780",
                    "PhoneTypeId":"4"
                }
            ],
            "Emails":[
                {
                    "ContactId":"509125498"
                }
            ],
            "Photo":"https:\/\/cdn.realtor.ca\/individual\/TS638209749600000000\/lowres\/1201397.jpg",
            "Position":"Associate",
            "PermitFreetextEmail":true,
            "FirstName":"Stephen",
            "LastName":"Koehn",
            "CorporationDisplayTypeId":"0",
            "PermitShowListingLink":true,
            "RelativeDetailsURL":"\/agent\/1863975\/stephen-koehn-100-10328-81-ave-nw-edmonton-alberta-t6e1x2",
            "AgentPhotoLastUpdated":"2023-05-29 16:36:00",
            "PhotoHighRes":"https:\/\/cdn.realtor.ca\/individual\/TS638209749600000000\/highres\/1201397.jpg",
            "RankMyAgentKey":"",
            "RealSatisfiedKey":"",
            "TestimonialTreeKey":""
        }
    ],
    "Property":{
        "Price":"$245,000",
        "Type":"Single Family",
        "Address":{
            "AddressText":"#507 11011 86 AV NW|Edmonton, Alberta T6G0X1",
            "Longitude":"-113.515849464418",
            "Latitude":"53.5216993968074",
            "PermitShowAddress":true,
            "DisseminationArea":null
        },
        "Photo":[
            {
                "SequenceId":"1",
                "HighResPath":"https:\/\/cdn.realtor.ca\/listings\/TS638194918676170000\/reb10\/highres\/4\/E4340224_1.jpg",
                "MedResPath":"https:\/\/cdn.realtor.ca\/listings\/TS638194918676170000\/reb10\/medres\/4\/E4340224_1.jpg",
                "LowResPath":"https:\/\/cdn.realtor.ca\/listings\/TS638194918676170000\/reb10\/lowres\/4\/E4340224_1.jpg",
                "LastUpdated":"2023-05-12 12:37:47 PM",
                "TypeId":"0"
            }
        ],
        "Parking":[
            {
                "Name":"Underground"
            }
        ],
        "TypeId":"300",
        "OwnershipType":"Condominium\/Strata",
        "OwnershipTypeGroupIds":[
            2
        ],
        "ParkingType":"Underground",
        "PriceUnformattedValue":"245000"
    },
    "Business":{

    },
    "Land":{
        "SizeTotal":"31.89 m2"
    },
    "AlternateURL":{
        "BrochureLink":"https:\/\/www.macintoshgroup.ca\/listings\/E4340224\/507-11011-86-avenue-edmonton-alberta\/"
    },
    "PostalCode":"T6G0X1",
    "HistoricalDataIsCleared":false,
    "ProvinceName":"Alberta",
    "RelativeDetailsURL":"\/real-estate\/25580028\/507-11011-86-av-nw-edmonton-garneau",
    "StatusId":"1",
    "PhotoChangeDateUTC":"2023-05-12 4:37:47 PM",
    "Distance":"",
    "RelativeURLEn":"\/real-estate\/25580028\/507-11011-86-av-nw-edmonton-garneau",
    "RelativeURLFr":"\/immobilier\/25580028\/507-11011-86-av-nw-edmonton",
    "Media":[
        {
            "MediaCategoryId":"4",
            "MediaCategoryURL":"https:\/\/www.macintoshgroup.ca\/listings\/E4340224\/507-11011-86-avenue-edmonton-alberta\/",
            "Description":"SalesBrochureWebsite",
            "Order":3
        }
    ],
    "InsertedDateUTC":"638195062676130000",
    "TimeOnRealtor":"",
    "Tags":[

    ],
    "PriceChangeDateUTC":"2023-07-13 4:40:17 PM",
    "OpenHouseInsertDateUTC":null,
    "ListingTimeZone":null,
    "ListingBoundary":null,
    "ListingGMT":null,
    "HasPriceUpdate":null
}

const mockResponse = {
    "text_response": "Mock Test Response",  
    "top_listings": {
        "listing_1": realMockResponse, 
        "listing_2": realMockResponse,
        "listing_3": realMockResponse,
    } 
};

const TextInput = ({ updateChatResponse, renderQueryBlocks }) => {

    const [inputValue, setInputValue] = useState('');
    
    const location = useLocation();
    const formValues = location.state?.formValues;

    console.log("FORM VALUES PASSED? ", formValues);

    const handleSubmit = async () => {
        const response_data = await sendPrompt(); //process the prompt
        if (response_data) {

            const text_response = response_data["text-response"];

            console.log("RECIEVED RESPONSE", response_data)
            console.log("TEXT RESPONSE", text_response);

            updateChatResponse(text_response); 
            renderQueryBlocks(response_data);
            setInputValue(''); 
        } else {
            console.log(mockResponse);
            renderQueryBlocks(mockResponse);
            updateChatResponse(inputValue); 
        }
    };
    
    const sendPrompt = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/prompt', {
                prompt: inputValue,
                formValues: formValues 
            });
            const data = response.data
            console.log("Receieved Response!", data);
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
                Go
            </button>
        </div>
        
    );
};

export default TextInput;