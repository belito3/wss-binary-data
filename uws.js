const uWS = require('uWebSockets.js');

const port = 8000;

const app = uWS.App({}).ws('/*', {
  /* Options */
  compression: 0,
  maxPayloadLength: 16 * 1024 * 1024,
  //idleTimeout: 10,
  /* Handlers */
  open: (ws, req) => {
    console.log('A WebSocket connected via URL: ' + req.getUrl() + '!');
  },
  message: (ws, message, isBinary) => {
    /* Ok is false if backpressure was built up, wait for drain */
    // send message to client
    let ok = ws.send(message, isBinary, false);
    console.log("Server received msg: ", message)
        
    console.log("Server receivce string of msg: ", ab2str(message));
       
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
  },
  close: (ws, code, message) => {
    console.log('WebSocket closed');
  }
}).any('/*', (res, req) => {
  res.end('Nothing to see here!');
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});


// convert binaryData to string
// Select UintXXArray appriciate
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// convert string to binaryData
function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
  }
  return buf;
}