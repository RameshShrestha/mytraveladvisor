import React from "react";
import {Autocomplete} from '@react-google-maps/api';
import { createTheme } from '@material-ui/core/styles';
import { useState } from "react";
import { AppBar,Toolbar,Typography,InputBase,Box } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
const Header = ({setCoordinates}) =>{

    const classes = useStyles();
    const [autComplete,setAutComplete] = useState(null);
    const onLoad = (autoComplete)=> setAutComplete(autoComplete);
    const onPlaceChanged = () =>{
        const lat = Autocomplete.getPlace().geometry.location.lat();
        const lng = Autocomplete.getPlace().geometry.location.lng();
        setCoordinates({lat,lng});
    }
    return(
        <AppBar position="static">

     
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
                Travel Advisor
                </Typography>
            <Box display="flex">
            <Typography variant="h6" className={classes.title}>
                            Explore New Places

                        </Typography>
                         <Autocomplete onLoad= {onLoad} onPlaceChanged ={onPlaceChanged} > 
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input : classes.inputInput}}/>
                            </div>
                        </Autocomplete> 
            </Box>
         
           

        </Toolbar>
        </AppBar>
    );
}
export default Header;
