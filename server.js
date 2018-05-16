const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();


const server = http.createServer(app);


const port = Number(process.env.PORT || 4000);

const io = socketIO(server);

io.on('connection', socket => {
	console.log('New Client ID: ' + socket.id);

	socket.on('change data', (data) =>{
		if(data){
			console.log('data change detected : ' + data );
			io.sockets.emit('change data', data)
		}
	})
	socket.on('change chat', (message) =>{
			console.log('chat change detected : ' + message );
			io.sockets.emit('change chat', message)
	})

	socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })


	socket.on('disconnect', () => {
		console.log('client disconnect');
	})
})

server.listen(port, ()=>{
	console.log('Server listen at ' + port);
})