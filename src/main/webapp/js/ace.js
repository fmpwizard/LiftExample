// this js generates the functionality from client side
// i commented the two functions which do the basic interaction with the server /sending/receiving

// at the bottom there is the commented line: subSocket = socket.subscribe(request);
// i had to comment it cause there is no websocket server listenging at the given url /editor/editor


var logged = false;

var editor = ace.edit("editor");

editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/java");
editor.getSession().on('change', sendChangedEvent);

// here is what happens when we edit something in the editor and send the change to the server
function sendChangedEvent(e) {
  console.log("getting ");
  console.log(e.data);
  theUserTypedThis(e); //e is not just the text entered on the UI, it is a complex javascript object with lots of details about where the one character was added/remove, etc
}

