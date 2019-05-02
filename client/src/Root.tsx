import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import PredictSection from "./PredictSection";
import attributes from "./PredictSection/attributes";
import exampleData from "./example-data";
import ReferenceLink from "./ReferenceLink";
import feature_importance from "./feature_importance.png";

function Root() {
  return (
    <div className="container">
      <h1>AWS Machine Learning Demo</h1>
      <p>
        When there are thousands of customers in a company's customer database,
        it could be a daunting attempt to spot customers who are “at the risk of
        leaving”. Having a focused customer retention program is of paramount
        concern. To pick the right customers into the retention program, a
        selection system is needed. Machine learning can be the solution.
      </p>

      <h2>Data Source</h2>
      <div className="mb-3">
        In this demo, a model was trained to look at 19 behavorial features of a
        customer to predict whether he/she will leave in sooner future. For
        example dataset,{" "}
        <ReferenceLink href="https://www.kaggle.com/blastchar/telco-customer-churn">
          7,044 rows of customer data
        </ReferenceLink>{" "}
        was used to train and validate the model. Below shows a few example rows
        of data.
      </div>

      <div style={{ overflowX: "scroll" }} className="mb-3">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Churn</th>
              {attributes.map(attr => (
                <th key={`th-${attr.name}`} scope="col">
                  {attr.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exampleData.map((item, i) => (
              <tr key={JSON.stringify(item)}>
                <th scope="row">{i}</th>
                <td>{item["Churn"]}</td>
                {attributes.map((attr, j) => (
                  <td key={`cell-${i}-${j}`}>{item[attr.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>The Model</h2>
      <p>
        The model was created and trained on the cloud using{" "}
        <ReferenceLink href="https://aws.amazon.com/sagemaker/">
          AWS SageMaker
        </ReferenceLink>
        . Extreme Gradient Boosting (usually called{" "}
        <ReferenceLink href="https://xgboost.readthedocs.io/en/release_0.72/tutorials/model.html">
          xgboost
        </ReferenceLink>
        ) algorithm was employed in this binary classification task. The model
        will intake labels (the Churn column) and features (the other columns)
        for training. Once training and validation are completed, the model is
        ready for making inference. It can then intake features and 'predict'
        whether a customer will churn by outputing a probability.
      </p>

      <p>
        Beside making inference, xgboost algorithm is able to calculate the
        relative importance of each feature in influencing the label.
      </p>

      <img src={feature_importance} alt="feature_importance" />

      <p>
        After having a satisfactory performance of precision rate 80% and recall
        rate 80%, an inference endpoint was created which can receive feature
        input from a frontend client (e.g. this app) and in response send
        prediction result.
      </p>

      <PredictSection />
    </div>
  );
}

export default Root;
