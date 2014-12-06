var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");
var Twitter = require('node-twitter');

var board = new five.Board({
    io: new Spark({
    token: process.env.SPARK_TOKEN,
          deviceId: process.env.SPARK_DEVICE_ID
        })
    });

board.on("ready", function() {
    
    leftServo = new five.Servo({
        pin: "A0",    
        type: "continuous"
    });
    
    rightServo = new five.Servo({
        pin: "D0",    
        type: "continuous"
    });    
    
    waveServo = new five.Servo({
        pin: "D1",
        range: [0, 60]
    });

    maowBuzzer = new five.Led("A7");
    
    board.repl.inject({
        leftServo: leftServo,
        rightServer: rightServo,
        waveServo: waveServo,
        maowBuzzer: maowBuzzer        
    });

    var twitterStreamClient = new Twitter.StreamClient(
        process.env.TWITTER_CONSUMER_KEY,
        process.env.TWITTER_CONSUMER_SECRET,
        process.env.TWITTER_TOKEN,
        process.env.TWITTER_TOKEN_SECRET
    );

    twitterStreamClient.on('close', function() {
        console.log('Connection closed.');
    });

    twitterStreamClient.on('end', function() {
        console.log('End of Line.');
    });

    twitterStreamClient.on('error', function(error) {
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    });

    twitterStreamClient.on('tweet', function(tweet) {
        controller(tweet.text);
        console.log(tweet.text);
    });
        
    twitterStreamClient.start(['#maowrc2014']);
        
    var speed = 0.5;
    
    function controller(cmd) {
        
          if (cmd.indexOf("stop") > -1) {
            leftServo.stop();
            rightServo.stop();
          }
          if (cmd.indexOf("up") > -1) {
            leftServo.cw(speed);
            rightServo.ccw(speed);
          }
          if (cmd.indexOf("down") > -1) {
            leftServo.ccw(speed);
            rightServo.cw(speed);
          }
          if (cmd.indexOf("right") > -1) {
            leftServo.cw(speed * 0.75);
            rightServo.cw(speed * 0.75);
          }
          if (cmd.indexOf("left") > -1) {
            leftServo.ccw(speed * 0.75);
            rightServo.ccw(speed * 0.75);
          }
          if (cmd.indexOf("wagleft") > -1) {
            waveServo.min();            
          }
          if (cmd.indexOf("wagright") > -1) {
            waveServo.max();            
          }
          if (cmd.indexOf("center") > -1) {
            waveServo.center();            
          }
          if (cmd.indexOf("maowon") > -1) {
            maowBuzzer.pulse(500);
          }
          if (cmd.indexOf("maowoff") > -1) {
            maowBuzzer.stop().off();
          }                      
      }            
});
