import React from 'react';

const style = {
    width: "200px",
    border: "2px solid black",
    padding: "10px",
    boxShadow: ""
}

const card = (props) => {
    return (
        <div style={style}>{props.text}</div>
    );
}

export default card;