function parsePolicy(bucketPolicyJSON) {
    if (!bucketPolicyJSON) {
      throw new Error('Bucket policy is empty or undefined');
    }
  
    if (typeof bucketPolicyJSON === 'string') {
      try {
        bucketPolicyJSON = JSON.parse(bucketPolicyJSON);
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
  