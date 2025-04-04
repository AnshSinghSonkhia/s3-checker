const { evaluateS3BucketExposure } = require('../src/index');
const assert = require('assert');

const publicPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicRead",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3:::example-bucket/*"
    }
  ]
};

const privatePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PrivateAccess",
      Effect: "Deny",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3:::example-bucket/*"
    }
  ]
};

console.log("Running tests...");

assert.strictEqual(evaluateS3BucketExposure(publicPolicy).exposed, true);
assert.strictEqual(evaluateS3BucketExposure(privatePolicy).exposed, false);

console.log("All tests passed!");
