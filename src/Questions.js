import './App.css';
import React from "react";
import onLoad from "./index.js";


class Questions extends React.Component {
    constructor(props){
        super()
        this.state={
            isRelevant: null,
            isPositive: null
        }
        this.yesRelevant = this.yesRelevant.bind(this);
        this.noRelevant = this.noRelevant.bind(this);
        this.yesPositive = this.yesPositive.bind(this);
        this.noPositive = this.noPositive.bind(this);
        this.submit = this.submit.bind(this);
        this.nextTweet = this.nextTweet.bind(this);
    }

    yesRelevant(){
        this.setState(prevState => {
            return {
                isRelevant: true,
                isPositive: prevState.isPositive,
            }
        })
        document.getElementById("Q1").style.display = "none";
        document.getElementById("Q2").style.display = "flex";
    }

    noRelevant(){
        this.setState(prevState => {
            return {
                isRelevant: false,
                isPositive: prevState.isPositive,
            }
        })
        document.getElementById("Q1").style.display = "none";
        document.getElementById("Q2").style.display = "flex";
    }
    yesPositive(){
        this.setState(prevState => {
            return {
                isRelevant: prevState.isRelevant,
                isPositive: true,
            }
        })
        document.getElementById("Q2").style.display = "none";
        document.getElementById("Q3").style.display = "flex";
    }
    noPositive(){
        this.setState(prevState => {
            return {
                isRelevant: prevState.isRelevant,
                isPositive: false,
            }
        })
        document.getElementById("Q2").style.display = "none";
        document.getElementById("Q3").style.display = "flex";
    }

    async submit(){
        var tweet = {
            positive: this.state.isRelevant,
            relevant: this.state.isPositive,
            id: this.props.tweet.id
        }
        var positive = '&positive='+tweet.positive;
        var relevant = '&relevant='+tweet.relevant;
        var id = '&id='+tweet.id;
        var url = 'https://0bigapadc5.execute-api.us-west-2.amazonaws.com/a/zombies-tweet-api?mode=update'+positive+relevant+id;
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
        
        document.getElementById("Q3").style.display = "none";
        document.getElementById("Q4").style.display = "flex";
    }
    
    nextTweet(){
        document.getElementById("Q4").style.display = "none";
        document.getElementById("Q1").style.display = "flex";
        onLoad();

    }

    render (){
        return(
            <div className = "Controls">
                <div className = "Question" id = 'Q1'>
                    <h3>Is this tweet about COD Zombies?</h3>
                    <div className  ="Yes-btn" onClick={this.yesRelevant}> <h4>Yes</h4> </div>
                    <div className = "No-btn" onClick={this.noRelevant}> <h4>No</h4> </div>
                </div>
                <div className = "Question" id = 'Q2'>
                    <h3>Is this tweet positive?</h3>
                    <div className  ="Yes-btn" onClick={this.yesPositive}> <h4>Yes</h4> </div>
                    <div className = "No-btn" onClick={this.noPositive}> <h4>No</h4> </div>
                </div>
                <div className = "Question" id = 'Q3'> 
                    <div className = "Next-btn"  onClick={this.submit}> <h4>Submit</h4> </div>
                </div>
                <div className = "Question" id = 'Q4'> 
                    <div className = "Submit-btn" onClick ={this.nextTweet}> <h4>Next Tweet</h4> </div>
                </div>

            </div>
        )
    }
}


export default Questions;
