import './App.css';


function Tweets(props) {
    
    return (
        <div className = "Tweets">
            <div className = "Tweet-box">
                <div className="Tweet"><h3>{props.tweet.tweet}</h3></div>
            </div>
        </div>
    )
}

export default Tweets;
