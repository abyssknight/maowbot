var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");

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

    var speed = 0.8;
    function controller(ch, key) {
        if (key) {
          if (key.name === "space") {
            leftServo.stop();
            rightServo.stop();
          }
          if (key.name === "up") {
            leftServo.cw(speed);
            rightServo.ccw(speed);
          }
          if (key.name === "down") {
            leftServo.ccw(speed);
            rightServo.cw(speed);
          }
          if (key.name === "right") {
            leftServo.cw(speed * 0.75);
            rightServo.cw(speed * 0.75);
          }
          if (key.name === "left") {
            leftServo.ccw(speed * 0.75);
            rightServo.ccw(speed * 0.75);
          }
          if (key.name === "f") {
            waveServo.min();            
          }
          if (key.name === "d") {
            waveServo.max();            
          }
          if (key.name === "c") {
            waveServo.center();            
          }
          if (key.name === "g") {
            maowBuzzer.pulse(500);
          }
          if (key.name === "h") {
            maowBuzzer.stop().off();
          }    
            

          commands = [].slice.call(arguments);
        } else {
          if (ch >= 1 && ch <= 9) {
            speed = five.Fn.scale(ch, 1, 9, 0, 255);
            controller.apply(null, commands);
          }
        }
      }


      keypress(process.stdin);

      process.stdin.on("keypress", controller);
      process.stdin.setRawMode(true);
      process.stdin.resume();    
    
});
