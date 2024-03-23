# Asterisk Audiofork with Azure Speech to Text Integration

## Project Overview
This project demonstrates a basic integration of the Audiofork module with Azure Speech to Text services. Audiofork is an open-source module within the Asterisk framework for audio manipulation, while Azure Speech to Text provides cloud-based speech recognition capabilities. By combining these technologies, developers can create applications that transcribe audio from telephony systems or other sources in real-time using Azure's powerful speech recognition capabilities.

## Demo Application
The demo application in this project is built using Node.js. It utilizes the Audiofork module to capture audio from a telephony source (e.g., SIP call) within an Asterisk environment. This audio is then streamed to Azure Speech to Text service for transcription. Once transcribed, the text output is logged or displayed for further processing.

## Getting Started
To use this demo application, follow these steps:

1. **Prerequisites:**
   - Node.js installed on your machine.
   - Access to an Asterisk server with Audiofork module installed and configured.
   - An Azure account with Speech to Text service provisioned.

2. **Clone the Repository:**
   ```
   git clone <repository_url>
   ```

3. **Install Dependencies:**
   ```
   cd <project_directory>
   npm install
   ```

4. **Configure Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Add your Azure Speech to Text subscription key and region to the `.env` file:
     ```
     AZURE_SPEECH_SUBSCRIPTION_KEY=your_subscription_key
     AZURE_SPEECH_REGION=your_region
     ```

5. **Run the Application:**
   ```
   node app.js
   ```

6. **Test the Application:**
   - Initiate a call to your Asterisk server or simulate audio input through another source.
   - Check the console output for transcription results from Azure Speech to Text.

## Additional Notes
- Ensure proper network connectivity and firewall settings to allow communication between the Asterisk server and Azure Speech to Text service.
- This demo application provides a basic integration example. Developers can extend it further to incorporate additional features or enhance error handling as per their requirements.
- [dotenv](https://www.npmjs.com/package/dotenv) package is used to manage environment variables. Make sure to add your Azure API keys to the `.env` file for proper configuration.

---

This update includes instructions on using dotenv for managing environment variables and reminds developers to add their Azure API keys to the `.env` file.