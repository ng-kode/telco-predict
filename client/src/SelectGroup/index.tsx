import React, { PureComponent, ChangeEvent } from "react";

export interface Option {
  value: any;
  label: string;
}

interface Props {
  options: Option[];
  label: string;
  value: any;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
interface State {}

export default class SelectGroup extends PureComponent<Props, State> {
  render() {
    const { options, label, value, handleChange } = this.props;

    return (
      <div className="form-group col-3">
        <label htmlFor="select">{label}</label>
        <select className="form-control" value={value} onChange={handleChange}>
          <option value="" disabled>
            Please Select
          </option>
          {options.map((option, i: number) => (
            <option key={option.label + i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
