import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function getTweet(){
  var url = 'https://0bigapadc5.execute-api.us-west-2.amazonaws.com/a/zombies-tweet-api?mode=get';
  const Response = await new Promise((resolve, reject) => {
    var req = fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'text/plain',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    req.then((result) => {
      var res = result.json()
      res.then((tmp) => {
          resolve({
            statusCode: 200,
            body: JSON.stringify(tmp, null, 4)
          });
      });  
    });
  });
  var tmp = (JSON.parse(Response.body));
  return tmp;
}

async function onLoad(){
  var firstTweet = await getTweet();
  ReactDOM.render(
    <React.StrictMode>
      <App tweet={firstTweet}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
  reportWebVitals();
}
onLoad();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

export default onLoad;