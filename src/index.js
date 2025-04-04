const parsePolicy = require('./utils/parsePolicy');
const evaluatePermissions = require('./utils/evaluatePermissions');

function evaluateS3BucketExposure(bucketPolicyJSON) {
  try {
    const policy = parsePolicy(bucketPolicyJSON);
    const exposureReport = evaluatePermissions(policy);
    
    return {
      exposed: exposureReport.exposed,
      reasons: exposureReport.reasons
    };
  } catch (err) {
    return {
      error: 'Invalid bucket policy or evaluation error',
      details: err.message
    };
  }
}

module.exports = {
  evaluateS3BucketExposure
};
