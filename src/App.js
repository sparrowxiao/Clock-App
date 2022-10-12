import imoon from '../src/assets/desktop/icon-moon.svg';
import dayTimeBG from '../src/assets/desktop/bg-image-daytime.jpg';
import nightTimeBG from '../src/assets/desktop/bg-image-nighttime.jpg';
import './App.css';
import { useState , useEffect } from 'react';

function App() {
  var [quote,setQuote]=useState([]);
  var [author,setAuthor]=useState([]);
  var [time,setTime]=useState(new Date());
  var [bgImageURL,setBG] = useState();
  var [greeting,setGreeting]=useState(
    ()=>{
      const currentHour= time.getHours();
      let greet = null;
      if(currentHour<12){
        greet='Morning';
      }else if(currentHour===12){
        greet='Noon';
      }else if((currentHour>12)&&(currentHour<17)){
        greet='Afternoon';
      }else if(currentHour>=18){
        greet='Evening';
      }
      if((currentHour>=6)&&(currentHour<18)){
        setBG(dayTimeBG);
      }else{
        setBG(nightTimeBG)
      }
      return greet;
    }
  );
  var [timeZone,setTimeZone]=useState(time.toLocaleTimeString([],{hour12: false,timeZoneName:'short'}));
  useEffect(() => {
    document.title = 'Clock App Challenage';
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=1')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setQuote(data[0].title);
            setAuthor(data[0].userId);
         })
         .catch((err) => {
            console.log(err.message);
         });
  });
  return (
    <div className="App" style={{backgroundImage: `url(${bgImageURL})` }}>
      <div className="Overlay">
        <div className="Top">
          <div className="Inspration">
            <p className="Quote">"{quote}"
            </p>
            <p className="Author">{author}</p>
          </div>
        </div>
        <div className="Bottom">
          <div className="Current-time">
            <div className="Greeting"><img src={imoon} className="Greeting-logo" alt="logo" /> Good {greeting}, it's currently</div>
            <div className="Clock">{time.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',hour12: false,})} <span className="Time-zone">{timeZone.replace(/[^A-Z]/g, '')}</span></div>
            <div className="Location">In Atlanta, USA</div>
          </div>
          <div className="More"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
