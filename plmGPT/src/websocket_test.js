import ws from 'k6/ws';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 45},
    { duration: '3m', target: 45 },
    { duration: '1s', target: 0 }, 
  ],
};

export default function () {
  const url = 'wss://backend-ckmm.onrender.com/ws/stream/Machinist/';
  
  const res = ws.connect(url, function (socket) {
    socket.on('open', function () {
      console.log('Connected');
      
      for (let i = 0; i < 12; i++) { 
        socket.send(`I'm going to say a number, can you please repeat the number back to me, don't say anything else: ${i + 1}`);
        sleep(3); 
      }
    });

    socket.on('message', function (message) {
      console.log('Received message: ', message);
    });

    socket.on('close', function () {
      console.log('Disconnected');
    });

    socket.on('error', function (e) {
      if (e.error() != 'websocket: close sent') {
        console.log('An unexpected error occurred: ', e.error());
      }
    });
  });

  check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}
