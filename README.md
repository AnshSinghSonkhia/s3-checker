# s3-checker

Checks if an AWS S3 bucket is publicly exposed or not.

[![npm](https://img.shields.io/npm/v/s3-checker.svg)](https://www.npmjs.com/package/s3-checker)  [![License](https://img.shields.io/npm/l/s3-checker.svg)](LICENSE) 

# Installation

Install via npm

```sh
npm i s3-checker
```

Install via yarn

```sh
yarn add s3-checker
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

