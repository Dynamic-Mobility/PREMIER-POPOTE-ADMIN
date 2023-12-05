import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {GOOGLE_MAP_KEY} from "../../utils/constants";

const GoogleMapComponent = props => {
    const {lat, lng, height = '400px', width = "100%"} = props;

    const mapStyles = {
        height: height,
        width: width,
    };

    const defaultCenter = {
        lat: lat,
        lng: lng,
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={10}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
