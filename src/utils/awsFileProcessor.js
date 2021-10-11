const fs = require("fs");
const { S3 } = require("@aws-sdk/client-s3");

class AwsFileProcessor {

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId) { throw new Error("invalid config AWS_ACCESS_KEY_ID"); }
    if (!secretAccessKey) { throw new Error("invalid config AWS_SECRET_ACCESS_KEY"); }
    if (!region) { throw new Error("invalid config AWS_REGION"); }

    this.s3 = new S3({ accessKeyId, secretAccessKey, region: region });
  }

  async uploadFileStream(bucketName, fileStream, streamSize, fileName) {
    if (!bucketName) { throw new Error("invalid bucketName"); }
    if (!fileStream) { throw new Error("invalid fileStream"); }
    if (!streamSize) { throw new Error("invalid streamSize"); }
    if (!fileName) { throw new Error("invalid fileName"); }

    let putObjectResult = await this.s3.putObject({ Bucket: bucketName, Key: fileName, Body: fileStream, ContentLength: streamSize });
    return putObjectResult;
  }

  async uploadFile(bucketName, filePath, fileName) {
    if (!bucketName) { throw new Error("invalid bucketName"); }
    if (!filePath) { throw new Error("invalid filePath"); }    
    if (!fileName) { throw new Error("invalid fileName"); }

    const stream = fs.createReadStream(filePath);
    
    let putObjectResult = await this.s3.putObject({ Bucket: bucketName, Key: fileName, Body: stream });
    return putObjectResult;
  }

  async getFile(bucketName, fileName) {    
    if (!bucketName) { throw new Error("invalid bucketName"); }    
    if (!fileName) { throw new Error("invalid fileName"); }

    let getObjectResult = await this.s3.getObject({ Bucket: bucketName, Key: fileName });
    return getObjectResult;
  }
}

module.exports = { AwsFileProcessor };