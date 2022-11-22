/* Global Variables */
let date=document.getElementById('date');
let content= document.getElementById('content');
let  zipCode = document.getElementById('zip');
let feelings = document.getElementById('feelings');
let temp=document.getElementById('temp');
//Set API base URL and API key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=896b652d1548ee6804ef7ffee0f6dbcc&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();
//Get Current weather data from OpenWeatherMap.com API
const getdata = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL+zipCode+apiKey);
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        // return error message
        console.log("error" + error);
    }
};
   //Return User Content asynchronously to the local server
   const userContent = async (userData) => {
    const userContent = await getUserData('/api', userData);
    date.innerHTML = `Date: ${newDate}`;
    //Update Date, zipCode and Feelings in the UI
    content.innerHTML="your feelings is "+userContent['feelings']+"zip code is "+userContent['zip-code'];
    return userContent;
};
    //validate zip code and feelings
    const validatedata = async (zipCode, feelings) => {            
        //Initiate Get Current weather temperature
           const weatherAsync = await getdata(baseURL, zipCode, apiKey);
           let temperature = weatherAsync.main.temp;
           let userData = {
               'zip-code': zipCode,'feelings': feelings,  'temp': temperature, 'date': newDate
           };
           //Initaite updating user content in the UI
           await userContent(userData);
           //Update temperature in the UI
           temp.innerHTML = `Temperature: ${temperature} °C`;
           return userData;
       }
const action_function=(e)=> {
    e.preventDefault();
    const weather = async () => {
        //Fetch User Content from the DOM and the OpenWeatherMap.com API
        zipCode=zipCode.value;
        feelings=feelings.value;
        //Initiate validation
        await validatedata(zipCode, feelings);
    };
    weather();
};
//Post User data from the DOM to the local server API
const getUserData = async (url = '', data = {}) => {
    const res = await fetch(url, 
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },       
            body: JSON.stringify(data), 
          }
        )
        try {
            const newUserData =  await res.json();
            return newUserData;
        } catch (error) {console.log("error"+error)}
};
//Initiate asynchrounus event on click
document.getElementById('generate').addEventListener('click', action_function);
