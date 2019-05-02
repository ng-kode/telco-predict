import { Option } from "../SelectGroup";

const attributes: {
  name: string;
  options?: Option[];
  isNumerical?: boolean;
}[] = [
  {
    name: "gender",
    options: [{ label: "Female", value: 0 }, { label: "Male", value: 1 }]
  },
  {
    name: "SeniorCitizen",
    options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }]
  },
  {
    name: "Partner",
    options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }]
  },
  {
    name: "Dependents",
    options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }]
  },
  {
    name: "tenure",
    isNumerical: true
  },
  {
    name: "PhoneService",
    options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }]
  },
  {
    name: "PaperlessBilling",
    options: [{ label: "No", value: 0 }, { label: "Yes", value: 1 }]
  },
  {
    name: "MonthlyCharges",
    isNumerical: true
  },
  {
    name: "TotalCharges",
    isNumerical: true
  },
  {
    name: "MultipleLines",
    options: [
      { label: "No", value: 0 },
      { label: "No phone service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "InternetService",
    options: [
      { label: "DSL", value: 0 },
      { label: "Fiber optic", value: 1 },
      { label: "No", value: 2 }
    ]
  },
  {
    name: "OnlineSecurity",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "OnlineBackup",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "DeviceProtection",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "TechSupport",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "StreamingTV",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "StreamingMovies",
    options: [
      { label: "No", value: 0 },
      { label: "No internet service", value: 1 },
      { label: "Yes", value: 2 }
    ]
  },
  {
    name: "Contract",
    options: [
      { label: "Month-to-month", value: 0 },
      { label: "One-year", value: 1 },
      { label: "Two-year", value: 2 }
    ]
  },
  {
    name: "PaymentMethod",
    options: [
      { label: "Bank transfer (automatic)", value: 0 },
      { label: "Credit card (automatic)", value: 1 },
      { label: "Electronic check", value: 2 },
      { label: "Mailed check", value: 3 }
    ]
  }
];

export default attributes;
