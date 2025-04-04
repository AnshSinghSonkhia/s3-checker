# s3-checker

A simple tool to check if an S3 bucket is publicly exposed.

# Installation
```sh
npm install s3-checker
```

# Usage

```js
const { evaluateS3BucketExposure } = require('s3-checker');

const bucketPolicy = {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::example-bucket/*"
    }
  ]
};

const result = evaluateS3BucketExposure(bucketPolicy);
console.log(result);
```

## Output

```json
{
  "exposed": true,
  "reasons": [
    "Statement with Effect 'Allow' applies to Principal '*'.",
    "Public 's3:GetObject' permission detected."
  ]
}
```

