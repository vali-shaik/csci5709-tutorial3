import React, { Fragment, Component } from "react";
import classes from "./Autocomplete.module.css";
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
    };

    onChange = ({ target: { value } }) => {
        const { options, setText } = this.props;
        let filteredOptions = [];
        const regex = new RegExp(`^${value}`, "i");
        options.filter((item) =>
            regex.test(item) ? filteredOptions.push(item) : null
        );
        setText(value);
        this.setState({
            filteredOptions:
                filteredOptions.length > 0 ? filteredOptions : ["No options"],
            showOptions: true,
            activeOptionIndex: -1,
        });
    };

    onKeyDown = ({ keyCode }) => {
        const { activeOptionIndex, filteredOptions } = this.state;
        const { setText } = this.props;
        if (keyCode === 13 && activeOptionIndex > -1) {
            // Enter key press
            this.setState({
                showOptions: false,
                activeOptionIndex: -1,
                filteredOptions: [],
            });
            setText(filteredOptions[activeOptionIndex]);
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
        const { setText } = this.props;
        setText(innerText);
        this.setState({
            showOptions: false,
            filteredOptions: [],
            activeOptionIndex: -1,
        });
    };

    closeSuggestionsHandler = () => {
        const { setText } = this.props;
        setText("");
        this.setState({
            displayShow: false,
            showOptions: false,
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
            },
            props: { text },
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
                <input
                    className="autocomplete"
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={text}
                    autoFocus
                />
                {showOptions && text && renderSuggestions()}
            </Fragment>
        );
    }
}
