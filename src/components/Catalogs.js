import React, { Component } from "react";
import Autocomplete from "./Autocomplete";
import Card from "./Card";

export default class Catalogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            cards: ["Card 1", "Card 2", "Card 3", "Card 4"],
        };
    }
    render() {
        const {
            state: { cards, text },
        } = this;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Autocomplete
                                    options={cards}
                                    text={text}
                                    setText={(text) => this.setState({ text })}
                                />
                            </td>
                            <td>
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
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
