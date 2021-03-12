import './App.css';
import Tweets from './Tweets.js';
import Questions from './Questions.js';

function App(props) {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Zombies Twitter</h1>
      </div>
      <Tweets tweet={props.tweet}/>
      <Questions tweet={props.tweet}/>
    </div>
  );
}



export default App;
