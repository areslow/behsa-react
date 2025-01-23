//import React from "react"; for typescript use type React.ChangeEvent<HTMLInputElement | ...>
// for type of e

const inputHelper = (e, data) => {
    const tempData = {...data};
    tempData[e.target.name] = e.target.value;
    return tempData;
}

export default inputHelper;