import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Paper,Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutLineIcon from '@material-ui/icons/LocationOnOutlined'; 
import {Rating} from '@material-ui/lab';
import useStyles from './styles';

const Map = ({setCoordinates,setBounds,coordinates,places,setChildClicked,weatherData}) =>{
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
   
    console.log(weatherData);


    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key :process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange = {(e)=>{
                   // console.log(e);
                    setCoordinates({lat: e.center.lat,lng : e.center.lng});
                    setBounds({ne : e.marginBounds.ne, sw : e.marginBounds.sw});
                }}
                onChildClick={(child)=>setChildClicked(child)}
              
                >
                     {places?.map((place,i)=>(
                        
                        <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude) || 0}
                        lng={Number(place.longitude) || 0}
                        key={i}>
                            {
                                !isDesktop ? (
                                    <LocationOnOutLineIcon color="primary" fontSize="large"/>
                                ) : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img className={classes.pointer} 
                                        src={place.photo ? place.photo.images.large.url : "https://picsum.photos/200/300"} alt={place.name} />
                                        <Rating size="small" value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                            }

                        </div>
                    ))} 
                    {
                     
                        weatherData?.weather?.map((data,i) => (
                            <div key={i} lat={weatherData.coord.lat} lng={weatherData.coord.lon}>
                                <img height={200} src={`https://openweathermap.org/img/w/${data.icon}.png`}/>
                            </div>

                        ))
                    }

                </GoogleMapReact>



        </div>


    );
}
export default Map