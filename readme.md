# openai-cost-calculator

`openai-cost-calculator` is a reliable npm module that provides cost calculations for various AI models offered by OpenAI. Pricing is maintained regularly to stay on top of OpenAI's pricing changes. Whether you need to calculate costs for OpenAI Language Models, Fine Tuning Models, Embedding Models, Image Models, or Audio Models, this module has got you covered.

## Installation

**Using npm:**
```
npm install openai-cost-calculator
```

**Using yarn:**
```
yarn add openai-cost-calculator
```

## Importing

**CommonJS:**
```javascript
const costCalculator = require('openai-cost-calculator');
```

**ES6:**
```javascript
import * as costCalculator from 'openai-cost-calculator';
```

## Functions

### 1. calculateLanguageModelCost

**Usage:**
```javascript
const cost = costCalculator.calculateLanguageModelCost('gpt-4', { promptTokens: 5000, completionTokens: 10000 });
console.log(cost);
```

**Example Output:**
```json
{
  "promptCost": 0.15,
  "completionCost": 0.3,
  "totalCost": 0.45,
  "formattedTotalCost": "$0.45"
}
```

# Combining openai-gpt-token-counter with openai-cost-calculator

You can combine the `openai-gpt-token-counter` module with this one to estimate the cost of processing text using a specific OpenAI model.

Before we begin, make sure that you have `openai-gpt-token-counter` installed. If not, you can install it using npm:
```shell
npm install openai-gpt-token-counter
```

## Usage
```javascript
// Importing the required modules
const tokenCounter = require('openai-gpt-token-counter');
const costCalculator = require('openai-cost-calculator');

const messages = [
  { role: "user", content: "This is a test prompt to test out the cost calculation functionality of openai-cost-calculator" },
  // Add more messages if needed
];

const model = "gpt-4"; // Replace with your desired OpenAI chat model

const tokenCount = tokenCounter.chat(messages, model);
console.log(`Token count: ${tokenCount}`);

// Calculate the cost of processing the text
const cost = costCalculator.calculateLanguageModelCost(model, { promptTokens: tokenCount });
console.log(`Processing cost: ${cost.formattedTotalCost}`);
```

This script first counts the number of tokens in a text for a specific OpenAI model using the `openai-gpt-token-counter` module. Then, it calculates the cost of processing these tokens using the `openai-cost-calculator` module. The result is the estimated cost of processing your text with the chosen OpenAI model.

Remember to replace `"This is a test sentence."` with your text and `"gpt-4"` with your desired OpenAI model. You can use any model supported by `openai-gpt-token-counter` and `openai-cost-calculator`.

With this approach, you can estimate the cost of using OpenAI models in your projects and ensure that you stay within your budget.

---

### 2. calculateFineTuningModelCost

**Usage:**
```javascript
const cost = costCalculator.calculateFineTuningModelCost('ada', 10000, 'Training');
console.log(cost);
```

**Example Output:**
```json
{
  "totalCost": 0.004,
  "formattedTotalCost": "$0.004"
}
```

### 3. calculateEmbeddingModelCost

**Usage:**
```javascript
const cost = costCalculator.calculateEmbeddingModelCost('ada', 10000);
console.log(cost);
```

**Example Output:**
```json
{
  "totalCost": 0.001,
  "formattedTotalCost": "$0.001"
}
```

### 4. calculateImageModelCost

**Usage:**
```javascript
const cost = costCalculator.calculateImageModelCost('512x512', 20);
console.log(cost);
```

**Example Output:**
```json
{
  "totalCost": 0.36,
  "formattedTotalCost": "$0.36"
}
```

### 5. calculateAudioModelCost

**Usage:**
```javascript
const cost = costCalculator.calculateAudioModelCost('whisper-1', 60);
console.log(cost);
```

**Example Output:**
```json
{
  "totalCost": 0.36,
  "formattedTotalCost": "$0.36"
}
```

## Available Models

This library supports a wide range of models:

- **Language Models**: gpt-4, gpt-4-0314, gpt-4-0613, gpt-3.5-turbo, etc. (all models)
- **Fine Tuning Models**: ada, babbage, curie, davinci
- **Embedding Models**: ada
- **Image Models**: Resolution(1024x1024, 512x512, 256x256)
- **Audio Models**: whisper-1

## Contributions

Contributions to improve `openai-cost-calculator` are more than welcome. Feel free to submit a pull request or report an issue on our [GitHub repository](https://github.com/codergautam/openai-cost-calculator).