import { useState } from 'react';
import './App.css';

const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) =>{
  return(
   <>
    <div className='image'>
      <img src={icon} alt="sun"/>
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
        <span className='lat'>latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>longitude</span>
        <span>{log}</span>
      </div>
      </div>
      <div className='data-container'>
          <div className='element'>
            <img src='./images/humidity1.png' alt="humidity" className='icon'/>
            <div className='data'>
              <div className='humidity-percent'>{humidity}%</div>
              <div className='text'>Humidity</div>
            </div>         
          </div>
          <div className='element'>
            <img src='./images/wind1.png' alt="wind" className='icon'/>
            <div className='data'>
              <div className='wind-percent'>{wind} km/hr</div>
              <div className='text'>Wind Speed</div>
            </div>         
          </div>
    </div>
   </> 
  );
};



function App() {
  let apiKey="512af981855a7358f302dc8e7bf17c60";
  const[text,setText]=useState("chennai");

  const[icon,setIcon]=useState('./images/sun1.png');
  const[temp,setTemp]=useState(0);
  const[city,setCity]=useState("Chennai");
  const[country,setCountry]=useState("IN");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);

  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);

  const search = async()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
  
    try{
      let res=await fetch(url);
      let data=await res.json();
      // console.log(data)
      if(data.cod==='404'){
        console.log("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
    }catch(error){
        console.error("error your page",error.message);
    }finally{

    }
  }

  const handleCity=(e)=>{
    setText(e.target.value);
  }
  
  const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      search();
    }
  }

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' value={text} className='city' placeholder='search city' onChange={handleCity} onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={()=>search()}>
            <img src='./images/search1.jpg' alt="search"/>
          </div>
        </div> 
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
      </div>
    </>
  ); 
}

export default App;
