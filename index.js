const calculator = require("./src");
console.log(calculator.calculateLanguageModelCost("text-davinci-003", {promptTokens: 100, completionTokens: 100}));