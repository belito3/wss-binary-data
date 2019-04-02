const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        console.log("Server received msg: ", message)
        
        console.log("Server receivce string of msg: ", ab2str(message));
        
        // send mesg to client
        ws.send(message)
    });
});





// convert binaryData to string
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

// convert string to binaryData
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}