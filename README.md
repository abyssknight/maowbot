# MaowBot - Twitter Controlled Cat Robot
This is my Robots Conf 2014 Project :D

This is my simple node + spark-io + pawel sumo bot + (twitter, keypress, pebble) code.

## Keypress
MaowBot accepts the following keyboard commands:
* d (wag left)
* f (wag right)
* c (center tail)
* g (maow)
* h (maow off)
* Arrow keys (fwd, back, right, left)

## Twitter
MaowBot currently supports the following commands:
* up
* down
* left
* right
* wagleft
* wagright
* stop
* maowon
* maowoff

To send commands to MaowBot, just use the hashtag #maowrc2014 and put the command in the text of your tweet. 

## Web Socket Interface 

Run node maowbot-socket/index.js and use the GUI on http://127.0.0.1:3000 to control MaowBot.

## Pebble

This is currently unsupported, at least until Watchbot's server is fixed. :)
