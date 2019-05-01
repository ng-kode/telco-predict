import React, { PureComponent, ChangeEvent } from "react";

interface Props {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

interface State {}

export default class NumberInput extends PureComponent<Props, State> {
  render() {
    const { value, handleChange, label } = this.props;

    return (
      <div className="form-group col-3">
        <label htmlFor="input">{label}</label>
        <input
          value={value}
          onChange={handleChange}
          className="form-control"
          type="text"
          placeholder="Please input number"
        />
      </div>
    );
  }
}
