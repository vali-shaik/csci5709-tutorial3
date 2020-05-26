import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
    return <div className={classes.Card}>{props.text}</div>;
};

export default Card;
