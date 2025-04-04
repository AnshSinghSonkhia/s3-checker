const { evaluateS3BucketExposure } = require('../src/index');
const assert = require('assert');

console.log("🔍 Running tests...");

// ✅ Test 1: Public Read Access
const publicReadPolicy = {
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
assert.strictEqual(evaluateS3BucketExposure(publicReadPolicy).exposed, true);
console.log("✅ Test 1 Passed: Public Read Access detected");

// ✅ Test 2: Public Write Access (s3:PutObject)
const publicWritePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicWrite",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:PutObject",
      Resource: "arn:aws:s3:::example-bucket/*"
    }
  ]
};
assert.strictEqual(evaluateS3BucketExposure(publicWritePolicy).exposed, true);
console.log("✅ Test 2 Passed: Public Write Access detected");

// ✅ Test 3: Public Delete Access (s3:DeleteObject)
const publicDeletePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicDelete",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:DeleteObject",
      Resource: "arn:aws:s3:::example-bucket/*"
    }
  ]
};
assert.strictEqual(evaluateS3BucketExposure(publicDeletePolicy).exposed, true);
console.log("✅ Test 3 Passed: Public Delete Access detected");

// ✅ Test 4: Public Read + Write + Delete Access
const publicFullAccessPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicFullAccess",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      Resource: "arn:aws:s3:::example-bucket/*"
    }
  ]
};
assert.strictEqual(evaluateS3BucketExposure(publicFullAccessPolicy).exposed, true);
console.log("✅ Test 4 Passed: Public Read + Write + Delete Access detected");

// ✅ Test 5: Secure (Non-Public) Bucket Policy
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
assert.strictEqual(evaluateS3BucketExposure(privatePolicy).exposed, false);
console.log("✅ Test 5 Passed: Secure Bucket Policy detected");

// ✅ Test 6: Malformed / Invalid Policy JSON
// try {
//   evaluateS3BucketExposure("invalid json");
//   console.log("❌ Test 6 Failed: Malformed JSON should throw an error");
// } catch (error) {
//   console.log("✅ Test 6 Passed: Malformed JSON correctly throws an error");
// }

// ✅ Test 6: Malformed / Invalid Policy JSON
try {
    evaluateS3BucketExposure("invalid json");
    console.log("❌ Test 6 Failed: Malformed JSON should throw an error");
  } catch (error) {
    console.log("✅ Test 6 Passed: Malformed JSON correctly throws an error");
  }
  

console.log("🎉 All tests passed successfully!");
