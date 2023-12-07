import {useEffect} from "react";
import io from "socket.io-client";
import {toast} from "react-toastify";
import {useAuth} from "../hooks/use-auth";

let socket;
const SocketIoGuard = props => {
    const { children } = props;
    const { user } = useAuth();

    useEffect(() => {
        socketInitializer();
        return () => {
            socket?.disconnect();
        };
    }, [])


    const socketInitializer = async () => {
        await fetch('/api/websocket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('incoming-message', msg => {
          const { message } = JSON.parse(msg);
          console.log(message);
          if (message?.sessionId === user?.sessionId){
            toast.success("You have been logged out!");
          }
          else{
            toast.error("You are still in session!");
          }
        })
    }

    return(
        <>
            {children}
        </>
    )
}

export default SocketIoGuard;