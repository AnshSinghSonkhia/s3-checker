function evaluatePermissions(policy) {
    const statements = policy.Statement;
    let exposed = false;
    let reasons = [];
  
    statements.forEach(statement => {
      if (statement.Effect === "Allow" && statement.Principal === "*") {
        exposed = true;
        reasons.push('Statement with Effect "Allow" applies to Principal "*".');
      }
      if (statement.Action.includes("s3:GetObject") && statement.Principal === "*") {
        reasons.push('Public "s3:GetObject" permission detected.');
      }
      if (statement.Action.includes("s3:PutObject") && statement.Principal === "*") {
        reasons.push('Public "s3:PutObject" permission detected.');
      }
      if (statement.Action.includes("s3:DeleteObject") && statement.Principal === "*") {
        reasons.push('Public "s3:DeleteObject" permission detected.');
      }
    });
  
    return { exposed, reasons };
  }
  
  module.exports = evaluatePermissions;
  