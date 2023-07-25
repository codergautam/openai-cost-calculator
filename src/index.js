const prices = require('./prices.json');
const { didYouMean } = require('./suggester');

function formattedTotalCost(totalCost) {
    if(totalCost < 0.001) {
        return "$"+totalCost.toFixed(4);
    } else if(totalCost < 0.01) {
        return "$"+totalCost.toFixed(3);
    } else {
        return "$"+totalCost.toFixed(2);
    }
}

const calculateLanguageModelCost = (modelName, {promptTokens, completionTokens}) => {
    modelName = modelName.toLowerCase();
    let pricePerToken = prices.LanguageModels[modelName]
    if (pricePerToken == null) {
      // Closest other model find
        throw new Error('Unknown model `' + modelName+"`, Did you mean `"+ didYouMean(modelName, Object.keys(prices.LanguageModels))+"`?");
    }
    if(!promptTokens) promptTokens = 0;
    if(!completionTokens) completionTokens = 0;
    promptTokens /= 1000;
    completionTokens /= 1000;
    return {
        promptCost: pricePerToken["Input"] * promptTokens,
        completionCost: pricePerToken["Output"] * completionTokens,
        totalCost: pricePerToken["Input"] * promptTokens + pricePerToken["Input"] * completionTokens,
        formattedTotalCost: formattedTotalCost(pricePerToken["Input"] * promptTokens + pricePerToken["Input"] * completionTokens)
    }
}

const calculateFineTuningModelCost = (modelName, tokens, operation) => {
    modelName = modelName.toLowerCase();
    let pricePerToken = prices.FineTuningModels[modelName]
        ? prices.FineTuningModels[modelName][operation]
        : null;
    if (pricePerToken == null) {
        throw new Error('Unknown model');
    }
    const totalCost = pricePerToken * tokens;
    return {
        totalCost,
        formattedTotalCost: formattedTotalCost(totalCost)
    };
}

const calculateEmbeddingModelCost = (modelName, tokens) => {
    modelName = modelName.toLowerCase();
    let pricePerToken = prices.EmbeddingModels[modelName]
        ? prices.EmbeddingModels[modelName]["Usage"]
        : null;
    if (pricePerToken == null) {
        throw new Error('Unknown model');
    }
    const totalCost = pricePerToken * tokens;
    return {
        totalCost,
        formattedTotalCost: formattedTotalCost(totalCost)
    };
}


const calculateImageModelCost = (resolution, images) => {
    let pricePerImage = prices.ImageModels["Resolution"][resolution];
    const totalCost = pricePerImage * images;
    return {
        totalCost,
        formattedTotalCost: formattedTotalCost(totalCost)
    };
}

const calculateAudioModelCost = (modelName, minutes) => {
    modelName = modelName.toLowerCase();
    let pricePerMinute = prices.AudioModels[modelName]
        ? prices.AudioModels[modelName]["Usage"]
        : null;
    if (pricePerMinute == null) {
        throw new Error('Unknown model');
    }
    const totalCost = pricePerMinute * minutes;
    return {
        totalCost,
        formattedTotalCost: formattedTotalCost(totalCost)
    };
}

module.exports = {
    calculateLanguageModelCost,
    calculateFineTuningModelCost,
    calculateEmbeddingModelCost,
    calculateImageModelCost,
    calculateAudioModelCost
}
