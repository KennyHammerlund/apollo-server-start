const { AwsFileProcessor } = require("../awsFileProcessor");
const streams = require("memory-streams");
const tmp = require("tmp");
const fs = require("fs");

test("dependency validation", () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  process.env.AWS_SECRET_ACCESS_KEY = "";
  expect(() => {
    new AwsFileProcessor();
  }).toThrow("invalid config AWS_SECRET_ACCESS_KEY");
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";

  process.env.AWS_ACCESS_KEY_ID = "";
  expect(() => {
    new AwsFileProcessor();
  }).toThrow("invalid config AWS_ACCESS_KEY_ID");
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";

  process.env.AWS_REGION = "";
  expect(() => {
    new AwsFileProcessor();
  }).toThrow("invalid config AWS_REGION");
  process.env.AWS_REGION = "AWS_REGION";

  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";
  expect(() => {
    new AwsFileProcessor();
  }).not.toThrow();
});

test("upload file stream validation", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  let afp = new AwsFileProcessor();

  try {
    await afp.uploadFileStream("", "fileStream", "streamSize", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid bucketName");
  }
  try {
    await afp.uploadFileStream("bucketName", "", "streamSize", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid fileStream");
  }
  try {
    await afp.uploadFileStream("bucketName", "fileStream", "", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid streamSize");
  }
  try {
    await afp.uploadFileStream("bucketName", "fileStream", "streamSize", "");
  } catch (e) {
    expect(e.message).toMatch("invalid fileName");
  }
});

test("upload file stream", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AKIATCYYCDDX7LADOXOS";
  process.env.AWS_SECRET_ACCESS_KEY =
    "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";
  process.env.AWS_REGION = "us-east-2";

  let awsFileProcessor = new AwsFileProcessor();
  let stream = new streams.ReadableStream("Hello World");
  let chunks = [];
  let uploadedSize = 0;

  stream.on("data", (chunk) => {
    uploadedSize += chunk.length;
    chunks.push(chunk);
  });

  let buffer = Buffer.concat(chunks);
  let fileResult = await awsFileProcessor.uploadFileStream(
    "aim-3m-test",
    buffer,
    uploadedSize,
    "test.txt"
  );

  expect(fileResult).not.toBeNull();
});

test("upload file validation", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  let awsFileProcessor = new AwsFileProcessor();

  try {
    await awsFileProcessor.uploadFile("", "filePath", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid bucketName");
  }
  try {
    await awsFileProcessor.uploadFile("bucketName", "", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid filePath");
  }
  try {
    await awsFileProcessor.uploadFile("bucketName", "filePath", "");
  } catch (e) {
    expect(e.message).toMatch("invalid fileName");
  }
});

test("upload file", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  let awsFileProcessor = new AwsFileProcessor();
  let tmpFile = tmp.fileSync();

  fs.appendFileSync(tmpFile.name, "random text");
  let fileResult = await awsFileProcessor.uploadFile(
    "aim-3m-test",
    tmpFile.name,
    "test1.txt"
  );

  expect(fileResult).not.toBeNull();

  tmpFile.removeCallback();
});

test("get file validation", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  let awsFileProcessor = new AwsFileProcessor();

  try {
    await awsFileProcessor.getFile("", "fileName");
  } catch (e) {
    expect(e.message).toMatch("invalid bucketName");
  }
  try {
    await awsFileProcessor.getFile("bucketName", "");
  } catch (e) {
    expect(e.message).toMatch("invalid fileName");
  }
});

test("get file", async () => {
  process.env.AWS_ACCESS_KEY_ID = "AWS_ACCESS_KEY_ID";
  process.env.AWS_SECRET_ACCESS_KEY = "AWS_SECRET_ACCESS_KEY";
  process.env.AWS_REGION = "AWS_REGION";

  let awsFileProcessor = new AwsFileProcessor();
  let fileResult = await awsFileProcessor.getFile("aim-3m-test", "test.txt");

  expect(fileResult).not.toBeNull();
});
