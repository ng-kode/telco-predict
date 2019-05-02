import React, { PureComponent, ChangeEvent } from "react";
import SelectGroup, { Option } from "../SelectGroup";
import NumberInput from "../NumberInput";
import attributes from "./attributes";
import { postPrediction } from "./api";

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
      [attr.name]: value
    });
  };

  createLabels = (): number[] => {
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

    return data;
  };

  handlePredictClick = () => {
    this.setState({ statusText: "Making inference..." });

    const data = this.createLabels();
    postPrediction(data)
      .then(res =>
        res.json().then((parsedRes: PredictResponse) => {
          const { status, data } = parsedRes;
          if (status !== "ok") {
            return this.handlePredictFailure(parsedRes);
          }

          const parsedValue = parseFloat(data || "");
          this.setState({
            statusText:
              parsedValue > 0.5
                ? `Probably (${(parsedValue * 100).toFixed(2)}%)`
                : `Might not be (${(parsedValue * 100).toFixed(2)}%)`
          });
        })
      )
      .catch(err => this.handlePredictFailure(err));
  };

  handlePredictFailure(res: any) {
    this.setState({
      statusText: "Opps...someething went wrong, maybe try again later"
    });
    console.log(res);
  }

  getNumericalInputLabel = (attr: { name: string }): string => {
    if (attr.name === "tenure") {
      return `tenure (0 to 100)${String.fromCharCode(42)}`;
    }

    if (attr.name === "MonthlyCharges") {
      return `MonthlyCharges (0 to 10)${String.fromCharCode(42)}`;
    }

    if (attr.name === "TotalCharges") {
      return `TotalCharges (below 2000)${String.fromCharCode(42)}`;
    }

    return attr.name;
  };

  render() {
    const { statusText } = this.state;
    return (
      <div>
        <h2>Playground</h2>
        <p>
          Let's make some good guesses. Set the values of these 19 behavorial
          features and click predict to see what will happen.
        </p>

        <div className="row">
          {attributes.map(attr =>
            attr.isNumerical ? (
              <NumberInput
                key={attr.name}
                value={this.state[attr.name]}
                handleChange={event =>
                  this.handleChange(attr, event.target.value)
                }
                label={this.getNumericalInputLabel(attr)}
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

        <p className="mb-4">
          {`${String.fromCharCode(
            42
          )} These are just "typical values" but of course you are free to try the wild ones.`}
        </p>

        <div className="mt-3 mb-5 text-center">
          <div className="mb-2">
            When You Click
            <button
              className="btn btn-primary ml-2"
              onClick={this.handlePredictClick}
            >
              Predict
            </button>
          </div>
          <div>Vectorized feature data {this.createLabels().join(", ")}</div>
          <div>&darr;</div>
          <div>Model hosted in SageMaker Endpoint</div>
          <div>&darr;</div>
          <div>
            Will this customer leave ?{" "}
            {!!statusText && <span className="ml-3">{statusText}</span>}
          </div>
        </div>
      </div>
    );
  }
}

interface PredictResponse {
  status: string;
  data?: string;
  message?: string;
}
