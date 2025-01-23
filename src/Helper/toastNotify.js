import { toast } from "react-toastify";

const toastNotify = (msg, type = "success", displayTime = 3000 ) =>{
    toast(msg, {
        type: type,
        position: "top-right",
        autoClose: displayTime,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //transition: Slide,
    });
}

export default toastNotify;