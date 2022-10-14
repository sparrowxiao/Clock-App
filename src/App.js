import imoon from '../src/assets/desktop/icon-moon.svg';
import isun from '../src/assets/desktop/icon-sun.svg';
import iarrowup from '../src/assets/desktop/icon-arrow-up.svg';
import iarrowdown from '../src/assets/desktop/icon-arrow-down.svg';
import dayTimeBG from '../src/assets/desktop/bg-image-daytime.jpg';
import nightTimeBG from '../src/assets/desktop/bg-image-nighttime.jpg';
import './App.css';
import { useState , useEffect } from 'react';

function getDayOfYear(date) {
  const timestamp1 = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

  const differenceInMilliseconds = timestamp1 - timestamp2;

  const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

  return differenceInDays;
}
function getNumOfWeeks(date){
var oneJan = new Date(date.getFullYear(),0,1);
var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
var result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
return result;
}

function App() {
  var [topPanelState,setTopPanelState]=useState("block");
  var [expPanelState,setExpPanelState]=useState("none");
  var [btnExpTitle,setbtnExpTitleState]=useState("more");
  var [iconArrow,setArrowIcon]=useState(iarrowdown);
  var [quote,setQuote]=useState([]);
  var [author,setAuthor]=useState([]);
  var [time,setTime]=useState(new Date());
  var [dayOfTheWeek, setDayOfTheWeek] = useState(time.getDay().toLocaleString('default',{weekday:'long'}));
  var [dayOfTheYear, setDayOfTheYear] = useState(getDayOfYear(time));
  var [weekNumber,setWeekNum]=useState(getNumOfWeeks(time));
  var [bgImageURL,setBG] = useState();
  var [iconURL,setIcon] = useState();
  var [greeting,setGreeting]=useState(
    ()=>{
      console.log('greeting states:'+time);
      let currentHour= time.getHours();
      console.log(currentHour);
      let greet;
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
        setIcon(isun);
      }else{
        setBG(nightTimeBG);
        setIcon(imoon);
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
            //console.log(data);
            setQuote(data[0].title);
            setAuthor(data[0].userId);
         })
         .catch((err) => {
            console.log(err.message);
         });
    var timer = setInterval(()=>{
      const date = new Date();
      setTime(date);
      //setGreeting();
    }, 1000 );
    return function cleanup() {
        clearInterval(timer)
    }
    
  });
  const toggleButton=()=>{
    console.log("toggle button function is triggered");
    setTopPanelState(topPanelState==="block" ? "none" : "block");
    setExpPanelState(expPanelState==="block" ? "none" : "block");
    setbtnExpTitleState(btnExpTitle==="more" ? "less" : "more");
    setArrowIcon(iconArrow === iarrowdown ? iarrowup : iarrowdown);

  }
  return (
    <div className="App" style={{backgroundImage: `url(${bgImageURL})` }}>
      <div className="Overlay">
        <div className="Top" style={{display:`${topPanelState}`}}>
          <div className="Inspration">
            <p className="Quote">"{quote}"
            </p>
            <p className="Author">{author}</p>
          </div>
        </div>
        <div className="Bottom">
          <div className="Current-time">
            <div className="Greeting"><img src={iconURL} className="Greeting-logo" alt="greeting logo" /> Good {greeting}, it's currently</div>
            <div className="Clock">{time.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',hour12: false,})} <span className="Time-zone">{timeZone.replace(/[^A-Z]/g, '')}</span></div>
            <div className="Location">In Atlanta, USA</div>
          </div>
          <div className="ExpandButton" onClick={toggleButton}>
            <div className='ButtonName'>{btnExpTitle}</div> 
            <div className="ArrowBg">
              <img src={iconArrow} alt="expand logo" />
              </div>
          </div>
        </div>
        <div className="ExpandPanel" style={{display:`${expPanelState}`}}>
          <div className="EP-left">
            <div className="Date-detail">
              <div className="Description">CURRENT TIMEZONE</div>
              <div className="Detailv">currentTimeZone</div>
            </div>
            <div className="Date-detail">
              <div className="Description">DAY OF THE YEAR</div>
              <div className="Detail">{dayOfTheYear}</div>
            </div>
            
          </div>
          <div className="EP-right">
          <div className="Date-detail">
              <div className="Description">DAY OF THE WEEK</div>
              <div className="Detail">{dayOfTheWeek}</div>
            </div>
            <div className="Date-detail">
              <div className="Description">WEEK NUMBER</div>
              <div className="Detail">{weekNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
