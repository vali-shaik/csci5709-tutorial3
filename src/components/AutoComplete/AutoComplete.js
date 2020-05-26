import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import classes from "./AutoComplete.module.css";
import Card from "../Card/Card";
import {
    AiFillCloseCircle,
    AiFillDownCircle,
    AiFillUpCircle,
} from "react-icons/ai";

const AutoComplete = (props) => {
    const [text, setText] = useState("");
    const items = props.items;
    const [suggestions, setSuggestions] = useState(items);
    const [isClicked, setIsClicked] = useState(false);
    const [index, setIndex] = useState(-1);
    const [displayShow, setDisplayShow] = useState(true);
    const [displaySuggestions, setDisplaySuggestions] = useState(false);

    const onChangeHandler = (event) => {
        setIsClicked(false);
        const value = event.target.value;
        setText(value);
        let filteredSuggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            filteredSuggestions = items
                .sort()
                .filter((item) => regex.test(item));
        }
        setDisplayShow(false);
        setDisplaySuggestions(true);
        setSuggestions(
            filteredSuggestions.length > 0
                ? filteredSuggestions
                : ["No options"]
        );
        setIndex(-1);
    };

    const onKeyPressHandler = ({ keyCode }) => {
        if (suggestions.includes(text.toLowerCase()) !== "") {
            if (keyCode === 13 && index > -1) {
                // Enter key press
                setIndex(-1);
                setSuggestions(items);
                setText(suggestions[index]);
                setIsClicked(true);
                setDisplaySuggestions(false);
                setDisplayShow(true);
            } else if (keyCode === 38 && suggestions[0] !== "No options") {
                // up arrow key press
                if (index > 0) {
                    setIndex(index - 1);
                }
                if (index === 0) {
                    setIndex(-1);
                }
            } else if (keyCode === 40 && suggestions[0] !== "No options") {
                // down arrow key press
                if (index < suggestions.length - 1) {
                    setIndex(index + 1);
                }
            }
        }
    };

    const closeSuggestionsHandler = () => {
        setText("");
        setDisplayShow(true);
        setSuggestions(items);
        setDisplaySuggestions(false);
    };

    const onShowHandler = () => {
        setDisplaySuggestions((suggestions) => !suggestions);
        setDisplayShow((displayShow) => !displayShow);
        renderSuggestions();
    };

    const suggestionsSelected = (value) => {
        setText(value);
        setSuggestions(items);
        setIsClicked(true);
        setDisplaySuggestions(false);
        setDisplayShow(true);
    };

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        if (suggestions[0] === "No options") {
            return (
                <ul className={classes.Disabled}>
                    <li className={classes.Disabled}>No options</li>
                </ul>
            );
        }
        return (
            <ul>
                {suggestions.map((item, i) => (
                    <li
                        key={i}
                        className={i === index ? "li-active" : ""}
                        onClick={() => suggestionsSelected(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Fragment>
            <div className={classes.AutoComplete}>
                <div className={classes.Inline}>
                    <input
                        type="text"
                        value={text}
                        onChange={onChangeHandler}
                        onKeyDown={onKeyPressHandler}
                    />
                    {text ? (
                        <AiFillCloseCircle
                            className={classes.Icon}
                            onClick={closeSuggestionsHandler}
                        />
                    ) : (
                        ""
                    )}
                    {displayShow ? (
                        <AiFillDownCircle
                            className={classes.Icon}
                            onClick={onShowHandler}
                        />
                    ) : (
                        <AiFillUpCircle
                            className={classes.Icon}
                            onClick={onShowHandler}
                        />
                    )}
                </div>
                {displaySuggestions ? renderSuggestions() : ""}
            </div>
            {isClicked ? <Card value={text} className={classes.Card} /> : ""}
        </Fragment>
    );
};

AutoComplete.propTypes = {
    suggestions: PropTypes.instanceOf(Array),
};

AutoComplete.defaultProps = {
    suggestions: [],
};

export default AutoComplete;
