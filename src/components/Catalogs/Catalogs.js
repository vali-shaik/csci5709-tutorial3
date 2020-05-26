import React, { Component, Fragment } from "react";
import Autocomplete from "../Autocomplete/Autocomplete";
import Card from "../Card/Card";
import Countries from "../../Countries";
import classes from "./Catalogs.module.css";

export default class Catalogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            cards: Countries,
        };
    }
    render() {
        const {
            state: { cards, text },
        } = this;
        return (
            <Fragment>
                <div className={classes.Catalogs}>
                    <Autocomplete
                        options={cards}
                        text={text}
                        setText={(text) => this.setState({ text })}
                    />
                </div>
                <div>
                    {
                        /* add card component here based on text value */
                        this.state.cards.includes(text) ? (
                            <Card text={text} />
                        ) : (
                            ""
                        )
                    }
                </div>
            </Fragment>
        );
    }
}
