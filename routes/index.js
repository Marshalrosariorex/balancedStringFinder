var express = require('express');
var router = express.Router();

function filterCharsByUniqueCount(substring){
  const uniqueLetters = new Map();
  for(let char of substring){
    uniqueLetters.set(char);
  }
  return uniqueLetters.size;
}

function checkLongestComboString(words_combo){
  const max_length = Math.max(...words_combo.map(word => word.length));
  return words_combo.filter(word => word.length === max_length);
}

function getBalancedSubstrings(S) {
  if (typeof S !== 'string') {
    throw new TypeError('Input must be a string');
  }
  let words_combo = [];
  for (let i = 0; i < S.length; i++) {
    for (let j = i + 1; j <= S.length; j++) {
      const substring = S.slice(i, j);
      if(substring.length > 2 && substring.length % 2 == 0){
        let filtered_letters_count = filterCharsByUniqueCount(substring);
        if(parseInt(filtered_letters_count) == 2){          
          words_combo.push(substring);
        }
      }
    }
  }
  let longest_word_combo = checkLongestComboString(words_combo);
  return longest_word_combo;
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  let string = (req.body.string_text);
  // console.log(`string - ${string}`)
  let result_arr = getBalancedSubstrings(string);
  res.render('index', { message: `longest balanced substrings: ${result_arr}` });
});

module.exports = router;
