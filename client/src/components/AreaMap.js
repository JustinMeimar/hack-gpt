import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 53.5232,
  lng: -113.5263
};


const AreaMap = () => {
  const [hide, setHide] = useState(false);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDD1wlIcP_JPUmCc-F5y6fTM8ts2PSSud8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default AreaMap;