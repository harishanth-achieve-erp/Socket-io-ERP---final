import { useEffect, useState } from "react";
import { socket } from "../socket/socketClient";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setIsConnected(false);
    });

    socket.on("all-events", (data) => {
      setEvents(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("all-events");
      socket.disconnect();
    };
  }, []);

  return { isConnected, events };
};
