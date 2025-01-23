import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ChatHubUrl } from '../../APIs/apiSettings';
import { toastNotify } from '../../Helper'

// const chatUser = {
//     id: "",
//     name: "",
//     phoneNumber: "",
//     role: "",
// }


const connectToHub = async () =>{
    try{
        const connection = new HubConnectionBuilder()
                                .withUrl(ChatHubUrl)
                                .configureLogging(LogLevel.Information)
                                .withAutomaticReconnect()
                                .build()
        await connection.start();
    }
    catch(err){

    }
}



export const requestSupport = async ({chatUser, chatRoom, setConnection, setIsConnected, setLoading})=>{
    //set loading = true;
    setLoading(true);
    try{
        const connection = new HubConnectionBuilder()
                          .withUrl(ChatHubUrl)
                          .configureLogging(LogLevel.Information)
                          .withAutomaticReconnect()
                          .build();
        await connection.start();
        await connection.invoke("UserJoinedRoom", chatUser, chatRoom);
        setConnection(connection);
        setIsConnected(true)
    }catch(err){
        toastNotify(err, "error");
        //requestSupport(chatUser, chatRoom, setConnection, setLoading);
    }
    setLoading(false);
}

// export const sendMessage = async({chatUser, chatRoom, message, connection})=>{
//     if(connection){
//         await connection.invoke("SendMessage", chatUser, chatRoom, message);
//     }
//     else toastNotify("you are not connected !", "warning");
// }