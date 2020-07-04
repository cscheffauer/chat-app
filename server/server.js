const { v4: uuidv4 } = require('uuid');
const webSocketServer = require('websocket').server;
const http = require('http');

const webSocketsServerPort = 8001;

const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});


const clients = {}; // clients will be stored in this object

const users = {}; // users will be stored in this object
let messages = [];  // messages will be stored in this array
let userActivity = [];  // every userActivity will be stored in this array

const typesDef = {
  USER_EVENT: "userevent",
  USER_ID_EVENT: "useridevent",
  NEW_MESSAGE_EVENT: "newmessageevent",
  EDIT_MESSAGE_EVENT: "editmessageevent",
  DELETE_MESSAGE_EVENT: "deletemessageevent"
}

const sendUserIDToClient = (userID) => {
  const json = { type: typesDef.USER_ID_EVENT };
  json.data = { userid: userID };
  clients[userID].sendUTF(JSON.stringify(json));      //send json as a UTF-8 websocket message to the connection of all clients
}


const broadcast = (json) => {
  // sending the data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);      //send json as a UTF-8 websocket message to the connection of all clients
  });
}


const buildJson = (dataFromClient, userID) => {
  const json = { type: dataFromClient.type };

  switch (dataFromClient.type) {
    case typesDef.USER_EVENT:
      users[userID] = dataFromClient.user;
      userActivity.push(`${dataFromClient.user.username} joined`);
      messages.push({ text: `${dataFromClient.user.username} joined.`, username: "Meetingbot", sent: new Date() });
      sendUserIDToClient(userID);
      json.data = { users, messages, userActivity };
      break;
    case typesDef.NEW_MESSAGE_EVENT:
      messages.push({ messageid: uuidv4(), ...dataFromClient.message });
      json.data = { messages, userActivity };
      break;
    case typesDef.EDIT_MESSAGE_EVENT:
      var foundIndex = messages.findIndex(message => message.messageid == dataFromClient.id)
      messages[foundIndex] = { state: "EDITED", ...dataFromClient.message };
      json.data = { messages, userActivity };
      break;
    case typesDef.DELETE_MESSAGE_EVENT:
      var foundIndex = messages.findIndex(message => message.messageid == dataFromClient.id)
      messages[foundIndex] = { state: "DELETED", ...messages[foundIndex] };
      json.data = { messages, userActivity };
      break;
  }
  return json;
}


wsServer.on('request', function (request) {
  var userID = uuidv4();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

  const connection = request.accept(null, request.origin);    //could be used to filter out specific request origins
  clients[userID] = connection;                               //store connection in clients object
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = buildJson(dataFromClient, userID);
      broadcast(JSON.stringify(json));
    }
  });
  // user disconnected
  connection.on('close', function (connection) {
    console.log((new Date()) + " User " + userID + " disconnected.");
    delete clients[userID];   //delete userID from clients object
    if (users[userID] !== undefined) {
      const json = { type: typesDef.USER_EVENT };
      userActivity.push(`${users[userID].username} left`);   //push "user left" message to userActivity array
      messages.push({ text: `${users[userID].username} left.`, username: "Meetingbot", sent: new Date() });
      delete users[userID];     //delete userID from users object

      json.data = { users, messages, userActivity };
      broadcast(JSON.stringify(json));    //send information that user left to all connected users
    }
  });
});

