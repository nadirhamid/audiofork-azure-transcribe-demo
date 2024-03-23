const sdk = require("microsoft-cognitiveservices-speech-sdk");
const url = require("url");
const { workerData } = require("worker_threads");
const createServer = require("http").createServer;
const parse = require("url").parse;
const WebSocketServer = require("ws").WebSocketServer;
require("dotenv").config();

const PORT = 5001;
let channelID = null;

const server = createServer();
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);

  if (pathname === "/") {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  }
});

wss.on("connection", async (ws, req) => {
  const parsed = parse(req.url, true /* get query string */);

  const location = url.parse(req.url, true);
  var textBuffer = "";

  let format = sdk.AudioStreamFormat.getWaveFormatPCM(8000, 16, 1); // 8000 Hz, 16 bit, 1 channel
  let pushStream = sdk.AudioInputStream.createPushStream(format);

  ws.on("message", (message) => {
    pushStream.write(message);
  });

  ws.on("close", () => {
    pushStream.close();
  });

  let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
  let speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.AZURE_SPEECH_SUBSCRIPTION_KEY,
    process.env.AZURE_SPEECH_REGION
  );

  //   speechConfig.enableDictation(); // Enable punctuation in transcriptions
  //   speechConfig.requestWordLevelTimestamps();
  let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  speechRecognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
  };

  speechRecognizer.recognized = (s, e) => {
    // console.log(s);
    if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
      console.log("RECOGNIZED result: " + e.result.text);
    } else if (e.result.reason == sdk.ResultReason.NoMatch) {
      console.log("NOMATCH: Speech could not be recognized.");
    }
  };

  speechRecognizer.canceled = (s, e) => {
    console.log(`CANCELED: Reason=${e.reason}`);

    if (e.reason == sdk.CancellationReason.Error) {
      console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
      console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
      console.log(
        "CANCELED: Did you set the speech resource key and region values?"
      );
    }

    speechRecognizer.stopContinuousRecognitionAsync();
  };

  speechRecognizer.sessionStopped = (s, e) => {
    console.log("\n    Session stopped event.");
    speechRecognizer.stopContinuousRecognitionAsync();
  };
  speechRecognizer.startContinuousRecognitionAsync();
});

server.listen(PORT);
console.log(`Server is running on port ${PORT}`);