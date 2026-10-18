const natural = require('natural');
const { WordTokenizer } = natural;

const tokenizer = new WordTokenizer();

function analyzeSentiment(text) {
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const positiveWords = ['love', 'great', 'excellent', 'happy', 'amazing'];
  const negativeWords = ['bad', 'poor', 'hate', 'angry', 'disappointed'];

  const score = tokens.reduce((total, word) => {
    if (positiveWords.includes(word)) return total + 1;
    if (negativeWords.includes(word)) return total - 1;
    return total;
  }, 0);

  return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
}

module.exports = { analyzeSentiment };
