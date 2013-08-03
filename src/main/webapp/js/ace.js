// this js generates the functionality from client side
// i commented the two functions which do the basic interaction with the server /sending/receiving

// at the bottom there is the commented line: subSocket = socket.subscribe(request);
// i had to comment it cause there is no websocket server listenging at the given url /editor/editor


var logged = false;
var socket = $.atmosphere;
var subSocket;
var transport = 'websocket';
var fallback_transport = 'long-polling';

var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/java");
editor.getSession().on('change', sendChangedEvent);

// here is what happens when we edit something in the editor and send the change to the server
function sendChangedEvent(e) {
    subSocket.push(JSON.stringify(e.data));
}

var request = {
    url: "/editor/editor",
    contentType: "application/json",
    logLevel: 'debug',
    transport: transport,
    fallbackTransport: fallback_transport
};

request.onOpen = function (response) {
    socket.info("opening")
    transport = response.transport;
};

request.onReconnect = function () {
    socket.info("Reconnecting")
};

// here is what happens when we receive data from the server
// do something like inserting the received message into the editor
request.onMessage = function (rs) {
    var change = JSON.parse(rs.responseBody);

    editor.moveCursorTo(change.range.start.row, change.range.start.column);
    editor.insert(change.text);
    editor.moveCursorTo(change.range.end.row, change.range.end.column + 1);
};

request.onClose = function () {
    console.log("close");
};

request.onError = function () {
    console.log("error");
};

//subSocket = socket.subscribe(request);