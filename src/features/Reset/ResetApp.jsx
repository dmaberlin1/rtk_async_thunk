import React from 'react';
import {resetToDefault} from "./reset-action";
import {useDispatch} from "react-redux";

const ResetApp = () => {
    const dispatch=useDispatch();
    return (
        <button onClick={()=>dispatch(resetToDefault())}>
            Reset
        </button>
    );
};

export default ResetApp;
