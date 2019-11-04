const Alexa = require("ask-sdk-core")
const { BEM_VINDO, FALAS, ERRO } = require("./falas")


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(BEM_VINDO)
      .reprompt(BEM_VINDO)
      .withSimpleCard('Boas vindas', BEM_VINDO)
      .getResponse();
  }
};

const FalaCampeaoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FalaCampeao';
  },
  handle(handlerInput) {
    
    const fala = FALAS[Math.floor(Math.random() * FALAS.length)];
    const repromptText = "Me peça para imitar outro campeão."


    return handlerInput.responseBuilder
      .speak(fala)
      .reprompt(repromptText)
      .getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(ERRO)
      .reprompt(ERRO)
      .getResponse();
  },
};

module.exports.hello = Alexa.SkillBuilders.custom()
.addRequestHandlers(
  LaunchRequestHandler,
  FalaCampeaoIntentHandler)
.addErrorHandlers(ErrorHandler)
.lambda();


