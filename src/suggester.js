function getLevenshteinDistance(a, b) {
  const matrix = [];

  if (a.length == 0) {
      return b.length;
  }

  if (b.length == 0) {
      return a.length;
  }

  // increment along the first column of each row
  for(let i = 0; i <= b.length; i++){
      matrix[i] = [i];
  }

  // increment each column in the first row
  for(let j = 0; j <= a.length; j++){
      matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(let i = 1; i <= b.length; i++){
      for(let j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
              matrix[i][j] = matrix[i-1][j-1];
          } else {
              matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, Math.min(matrix[i][j-1] + 1, matrix[i-1][j] + 1));
          }
      }
  }

  return matrix[b.length][a.length];
}

function didYouMean(input, possibilities) {
  let closestMatch = possibilities[0];
  let shortestDistance = getLevenshteinDistance(input, possibilities[0]);

  for (const possibility of possibilities) {
      const distance = getLevenshteinDistance(input, possibility);
      if (distance < shortestDistance) {
          shortestDistance = distance;
          closestMatch = possibility;
      }
  }

  return closestMatch;
}

module.exports = {
  getLevenshteinDistance,
  didYouMean
}