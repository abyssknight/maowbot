var five = require("johnny-five");
var Spark = require("spark-io");
var keypress = require("keypress");
var Cylon = require('cylon');

Cylon.api({
  host: '0.0.0.0',
  port: '8080',
  ssl: false
});

Cylon.robot({
  name: 'pebble',

  connections: {
    pebble: { adaptor: 'pebble' }
  },

  devices: {
    pebble: { driver: 'pebble' }
  },

  work: function(my) {
    my.pebble.send_notification("Hello Pebble!");

    my.pebble.on('button', function(data) {
      console.log("Button pushed: " + data);
    });

    my.pebble.on('tap', function() {
      console.log("Tap event detected");
    });
  }

}).start();

/*
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

    board.repl.inject({
        leftServo: leftServo,
        rightServer: rightServo
    });

    var speed = 0.5;
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

*/