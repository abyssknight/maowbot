var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var five = require("johnny-five");
var Spark = require("spark-io");

var board, leftServo, rightServo, waveServo, maowBuzzer, speed;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//app.param('cmd');

app.get('/api/:cmd', function(req, res){
  try{
      controller(req.params.cmd);
      res.send("OK");
  }
  catch(e){
      res.send("BAD");
      console.log(e);
  }
});

io.on('connection', function(socket){
  socket.on('maowbot control', function(msg){
    io.emit('maowbot control', msg);   
    console.log(msg);
    if(board.isReady){
        controller(msg);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

board = new five.Board({
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
        
    speed = 0.8;              
});

function controller(cmd) {
  console.log(cmd);
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
  if (cmd.indexOf("wagleft") == 0) {
    waveServo.min();            
  }
  if (cmd.indexOf("wagright") == 0) {
    waveServo.max();            
  }    
  if (cmd.indexOf("right") == 0) {
    leftServo.cw(speed * 0.75);
    rightServo.cw(speed * 0.75);
  }
  if (cmd.indexOf("left") == 0) {
    leftServo.ccw(speed * 0.75);
    rightServo.ccw(speed * 0.75);
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