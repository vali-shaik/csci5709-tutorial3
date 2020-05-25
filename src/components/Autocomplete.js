import React, { Fragment, Component } from 'react'

export default class Autocomplete extends Component {
  state = {
    showOptions: false,
    activeOptionIndex: 0,
    filteredOptions: []
  }

  onChange = ({ target: { value } }) => {
    const { options, setText } = this.props
    let filteredOptions = []
    options.filter(item => item.toLowerCase().includes(value) ? filteredOptions.push(item) : null)
    this.setState({
      filteredOptions, showOptions: true, activeOptionIndex: 0
    })
    setText(value)
  }

  onKeyDown = ({ keyCode }) => {
    const { activeOptionIndex, filteredOptions } = this.state
    const { setText } = this.props
    if (keyCode === 13) {// Enter key press      
      this.setState({ showOptions: false, activeOptionIndex: 0 })
      setText(filteredOptions[activeOptionIndex])
    } else if (keyCode === 38) {// up arrow key press
      if (activeOptionIndex > 0) {
        this.setState({ activeOptionIndex: activeOptionIndex - 1 })
      }
    } else if (keyCode === 40) {// down arrow key press
      if (activeOptionIndex < filteredOptions.length - 1) {
        this.setState({ activeOptionIndex: activeOptionIndex + 1 })
      }
    }
  }

  onOptionsListClick = ({ currentTarget: { innerText } }) => {
    const { setText } = this.props
    setText(innerText)
    this.setState({ showOptions: false, filteredOptions: [], activeOptionIndex: 0 })
  }

  render() {
    const { state: { showOptions, filteredOptions, activeOptionIndex }, props: { text }, onChange, onKeyDown, onOptionsListClick } = this
    return <Fragment>
      <input
        className="autocomplete"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={text}
        autoFocus
      />
      {showOptions && text && filteredOptions.length ?
        <ul className="options-list">
          {filteredOptions.map((item, index) =>
            <li
              key={item}
              className={index === activeOptionIndex ? 'option-active' : ''}
              onClick={(e) => onOptionsListClick(e)}
            >
              {item}
            </li>
          )}
        </ul> :
        null
      }
    </Fragment>
  }
}
