import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(4.689416); //4.689416
  const [longitude, setLongitude] = useState(-74.1072599); //-74.1072599
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [humidity, sethumidity] = useState("");
  const [temMax, settemMax] = useState("");
  const [temMin, settemMin] = useState("");
  
  
  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

 

  const fetchWeather = async () => {   // matriz de dependencia
    try {
      await window.navigator.geolocation.getCurrentPosition(     // ubicacion actual
        savePositionToState
      );
      const res = await axios.get(  //res guarda la posicion
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c0d69aec0ecba6c36cdd3985f522dc66&units=metric`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setWeather(res.data.weather[0].main);
      sethumidity(res.data.main.humidity);
      settemMax(res.data.main.temp_max);
      settemMin(res.data.main.temp_min);

    } catch (err) {       // por si tiene errores
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  const [change, getChangeTemp] = useState('') 
  const fahrenheit = ((temperature) * 33,8)

  return (
    <div className="app">
      <div className="app__container">
        <h1>Ciudad Actual: {cityName}</h1>
        <h2>Estado: {weather} </h2>
        <h2>Humedad: {humidity}%</h2>
        <h2>Temperatura Maxima: {temMax}</h2>
        <h2>Temperatura Minima: {temMin}</h2>
        
        <h2>Temperatura: { `${change ? temperature + ' ºC': fahrenheit + ' ºF' }`} </h2>
        
   <button onClick={() => getChangeTemp(!change)}>Cambiar de unidad</button> 

      </div>
    </div>
  );
}

export default App;