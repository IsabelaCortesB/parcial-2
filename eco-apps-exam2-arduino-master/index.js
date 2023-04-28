import express, {
    request,
    response
} from "express";
import {
    Server
} from "socket.io";
import cors from "cors";

//Serial Port Configuration

import {
    SerialPort,
    ReadlineParser
} from "serialport"
const protocolConfiguration = {
    path: '/dev/cu.usbserial-A50285BI',
    baudRate: 9600
}
const serialPort = new SerialPort(protocolConfiguration);
const parser = serialPort.pipe(new ReadlineParser());



const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
    })

})
const io = new Server(httpServer, {
    path: '/real-time'
})

expressApp.use('/game', express.static('public-game'))
expressApp.use(express.json())

io.on('connection', (socket) => {
    console.log('Connected!', socket.id)
    //
})

let currentScore = 0;

expressApp.get('/final-score', (request, response) => {
    response.send({
        content: currentScore
    });
})



/*___________________________________________

1) Create an endpoint to POST player's current score and print it on console
It should send a messago to ARDUINO to turn on and off the lights when the player scores a point
_____________________________________________ */
//let userFinalScore = 0;

const users =  [];

app.post('/score', (request, response) =>{
    let userPoints = request.body;
    //console.log(userPoints);
    userFinalScore = userPoints.content;
})

app.get('/final-score', (request, response) =>{
    let message = {content: userFinalScore}
    response.send(message);
    response.end();
})


/*___________________________________________

2) Create an endpoint to POST that the game is over and turn on all the lights.
_____________________________________________ */

expressApp.post('/game-over', (request, response) => {

    //
    
})

let arduinoMessage = {
    actuatorValue: 0,
    btnAValue: 0,
    btnBValue: 0
}


    /*___________________________________________

3) Use the socket.io instance to send the message from the ARDUINO to the client in the browser

_____________________________________________ */

// PUT IT HERE

parser.on('data', (arduinoMessage) =>{
    
    let dataArray = arduinoMessage.split(" ");
    let remoteControl = {
        actuatorValue: dataArray[1],
        btnAValue: dataArray[3],
        btnBValue: dataArray[5]
    }

    ioServer.emit('remoteControl', remoteControl);
});