var express = require("express");
var cors = require("cors");
var AWS = require("aws-sdk");

var router = express.Router();
var sagemakerruntime = new AWS.SageMakerRuntime({ region: "us-east-1" });

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

router.post("/predict", cors(corsOptions), function(req, res, next) {
  const features = req.body.data;
  if (!features) {
    res.send({
      status: "error",
      message: 'Missing "data" in request body'
    });
  }

  sagemakerruntime.invokeEndpoint(
    {
      EndpointName: "xgboost-telco-v1",
      ContentType: "text/csv",
      Body: features
    },
    function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        res.send({
          status: "error",
          message: "Prediction endpoint error"
        });
      } else {
        res.send(
          {
            status: "ok",
            data: data.Body.toString()
          } // successful response
        );
      }
    }
  );
});

module.exports = router;
