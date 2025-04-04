function parsePolicy(bucketPolicyJSON) {
    if (typeof bucketPolicyJSON === 'string') {
      try {
        return JSON.parse(bucketPolicyJSON);
      } catch (error) {
        throw new Error('Invalid JSON format');
      }
    }
    if (typeof bucketPolicyJSON === 'object' && bucketPolicyJSON.Statement) {
      return bucketPolicyJSON;
    }
    throw new Error('Invalid bucket policy structure');
  }
  
  module.exports = parsePolicy;
  