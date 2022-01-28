import axios from 'axios';

const URL = "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";
const useLocalData = true;


export const getPlacesData = async(type,sw,ne)=>{
    try{
        if(!useLocalData){
            const {data : {data} }  = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
                params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng
                },
                headers: {
                    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
                }

        });
        return data;
        }else{
            let url ="";
            if (type ==="restaurants"){
                url ="/dummyRestaurantData.json";
            }else if(type === "hotels"){
                url = "/dummyHotelData.json";
            }else{
                url = "/dummyAttractionData.json";
            }
            const response = await fetch(url);
                const data = await response.json();
                return data.data;
                        
           
    }
       

       

        

    }catch(err){
            console.log(err);
    }
}


export const getWeatherData = async(lat,lng)=>{
    const useLocalData = true;
    try{
        if(!useLocalData){
            const {data  }  = await axios.get(`https://community-open-weather-map.p.rapidapi.com/weather`,{
                params: {
                    lat: lat,
                    lon: lng,
                },
                headers: {
                    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
                }

        });
        return data;
        }else{
            let url ="/dummyWeatherData.json";
          
            const response = await fetch(url);
                const data = await response.json(); 

                return data;
                        
           
    }
       

       

        

    }catch(err){
            console.log(err);
    }
}