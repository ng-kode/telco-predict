var express = require("express");
var AWS = require("aws-sdk");

var router = express.Router();
var sagemakerruntime = new AWS.SageMakerRuntime({ region: "us-east-1" });

router.get("/predict", function(req, res, next) {
  sagemakerruntime.invokeEndpoint(
    {
      EndpointName: "xgboost-telco-v1",
      ContentType: "text/csv",
      Body:
        "0.0,0.0,1.0,1.0,5.0,0.0,0.0,34.25,163.55,0.0,1.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0"
    },
    function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        console.log(data.Body.toString()); // successful response
      }
    }
  );
});

module.exports = router;
