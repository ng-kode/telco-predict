import React, { PureComponent, ChangeEvent } from "react";
import SelectGroup, { Option } from "../SelectGroup";
import NumberInput from "../NumberInput";
import attributes from "./attributes";

interface Props {}
interface State {
  [key: string]: any;
}

export default class App extends PureComponent<Props, State> {
  state: State = {
    gender: 0,
    SeniorCitizen: 0,
    Partner: 1,
    Dependents: 1,
    PhoneService: 0,
    MultipleLines: 1,
    InternetService: 0,
    OnlineSecurity: 0,
    OnlineBackup: 2,
    DeviceProtection: 0,
    TechSupport: 2,
    StreamingTV: 0,
    StreamingMovies: 1,
    Contract: 0,
    PaperlessBilling: 0,
    PaymentMethod: 2,

    tenure: 5,
    MonthlyCharges: 34.25,
    TotalCharges: 163.55,

    statusText: ""
  };

  handleChange = (
    attr: { name: string; options?: Option[]; isNumerical?: boolean },
    value: string
  ) => {
    this.setState({
      [attr.name]: attr.isNumerical ? parseFloat(value) : parseInt(value)
    });
  };

  handlePredictClick = () => {
    const data: number[] = [];

    attributes.forEach(attr => {
      if (attr.isNumerical) {
        return data.push(this.state[attr.name]);
      } else {
        const value = this.state[attr.name];
        const numClasses = (attr.options || []).length;
        if (numClasses === 2) {
          data.push(value);
        } else {
          const arr = [...Array(numClasses)].map(_ => 0);
          arr[value] = 1;
          arr.forEach(a => data.push(a));
        }
      }
    });
    const payload = {
      data: data.join(",")
    };

    this.setState({ statusText: "Making inference..." });
  };

  render() {
    const { statusText } = this.state;
    return (
      <div>
        <h3>Will this customer leave soon (churn) ?</h3>
        <div className="row">
          {attributes.map(attr =>
            attr.isNumerical ? (
              <NumberInput
                key={attr.name}
                value={this.state[attr.name]}
                handleChange={event =>
                  this.handleChange(attr, event.target.value)
                }
                label={attr.name}
              />
            ) : (
              <SelectGroup
                key={attr.name}
                label={attr.name}
                options={attr.options || []}
                value={this.state[attr.name]}
                handleChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  this.handleChange(attr, event.target.value)
                }
              />
            )
          )}
        </div>

        <button className="btn btn-primary" onClick={this.handlePredictClick}>
          Predict
        </button>

        {!!statusText && <span className="m-3">{statusText}</span>}
      </div>
    );
  }
}
