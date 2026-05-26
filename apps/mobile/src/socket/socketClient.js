import {io} from 'socket.io-client'

const socketURL = 'http://10.91.164.119:3000' 

export const socket = io(socketURL, {
  transports: ['websocket'],
  autoConnect: false,
})
