import React, { Fragment, Component } from "react";
import classes from "./Autocomplete.module.css";
import Card from "../Card/Card";
import {
    AiFillCloseCircle,
    AiFillDownCircle,
    AiFillUpCircle,
} from "react-icons/ai";

export default class Autocomplete extends Component {
    state = {
        showOptions: false,
        activeOptionIndex: -1,
        filteredOptions: [],
        displayShow: true,
        text: "",
        isClicked: false,
    };

    onChange = ({ target: { value } }) => {
        const { options } = this.props;
        let filteredOptions = [];
        const regex = new RegExp(`^${value}`, "i");
        options.filter((item) =>
            regex.test(item) ? filteredOptions.push(item) : null
        );
        this.setState({
            filteredOptions:
                filteredOptions.length > 0 ? filteredOptions : ["No options"],
            showOptions: true,
            activeOptionIndex: -1,
            text: value,
            isClicked: false,
        });
    };

    onKeyDown = ({ keyCode }) => {
        const { activeOptionIndex, filteredOptions } = this.state;
        if (keyCode === 13 && activeOptionIndex > -1) {
            // Enter key press
            this.setState({
                showOptions: false,
                activeOptionIndex: -1,
                filteredOptions: [],
                text: filteredOptions[activeOptionIndex],
                isClicked: true,
            });
        } else if (keyCode === 38 && filteredOptions[0] !== "No options") {
            // up arrow key press
            if (activeOptionIndex > 0) {
                this.setState({ activeOptionIndex: activeOptionIndex - 1 });
            }
            if (activeOptionIndex === 0) {
                this.setState({ activeOptionIndex: -1 });
            }
        } else if (keyCode === 40 && filteredOptions[0] !== "No options") {
            // down arrow key press
            if (activeOptionIndex < filteredOptions.length - 1) {
                this.setState({ activeOptionIndex: activeOptionIndex + 1 });
            }
        }
    };

    onOptionsListClick = ({ currentTarget: { innerText } }) => {
        this.setState({
            showOptions: false,
            filteredOptions: [],
            activeOptionIndex: -1,
            text: innerText,
            isClicked: true,
        });
    };

    closeSuggestionsHandler = () => {
        this.setState({
            displayShow: false,
            showOptions: false,
            text: "",
        });
    };

    onShowHandler = () => {
        this.setState((state) => ({
            displayShow: !state.displayShow,
            showOptions: !state.showOptions,
        }));
    };

    render() {
        const {
            state: {
                showOptions,
                filteredOptions,
                activeOptionIndex,
                displayShow,
                text,
                isClicked,
            },
            onChange,
            onKeyDown,
            onOptionsListClick,
        } = this;

        const renderSuggestions = () => {
            if (filteredOptions.length === 0) {
                return null;
            }
            if (filteredOptions[0] === "No options") {
                return (
                    <ul className={classes.Disabled}>
                        <li className={classes.Disabled}>No options</li>
                    </ul>
                );
            }
            return (
                <ul className="options-list">
                    {filteredOptions.map((item, index) => (
                        <li
                            key={item}
                            className={
                                index === activeOptionIndex ? "li-active" : ""
                            }
                            onClick={(e) => onOptionsListClick(e)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            );
        };

        return (
            <Fragment>
                <div className={classes.Autocomplete}>
                    <div className={classes.Inline}>
                        <input
                            className="autocomplete"
                            type="text"
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            value={text}
                            autoFocus
                        />
                        {text ? (
                            <AiFillCloseCircle
                                className={classes.Icon}
                                onClick={() => this.closeSuggestionsHandler}
                            />
                        ) : (
                            ""
                        )}
                        {displayShow ? (
                            <AiFillDownCircle
                                className={classes.Icon}
                                onClick={() => this.onShowHandler}
                            />
                        ) : (
                            <AiFillUpCircle
                                className={classes.Icon}
                                onClick={() => this.onShowHandler}
                            />
                        )}
                    </div>
                    {showOptions && text && renderSuggestions()}
                </div>
                {isClicked ? (
                    <Card text={text} className={classes.Card} />
                ) : (
                    ""
                )}
            </Fragment>
        );
    }
}
