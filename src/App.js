import imoon from '../src/assets/desktop/icon-moon.svg';
import './App.css';
import { useState , useEffect } from 'react';

function App() {
  var [time,setTime]=useState(new Date());
  useEffect(() => {
    document.title = 'Clock App Challenage';
    var timer = setInterval(()=>setTime(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
  });
  return (
    <div className="App">
      <div className="Overlay">
        <div className="Top">
          <div className="Inspration">
            <p className="Quote">"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti."
            </p>
            <p className="Author">Ada LLL</p>
          </div>
        </div>
        <div className="Bottom">
          <div className="Current-time">
            <div className="Greeting"><img src={imoon} className="Greeting-logo" alt="logo" /> Good Evening, it's currently</div>
            <div className="Clock">{time.toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',hour12: false,})} <span className="Time-zone">EST</span></div>
            <div className="Location">In Atlanta, USA</div>
          </div>
          <div className="More"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
