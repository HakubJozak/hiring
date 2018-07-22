var words = {
  word: [],
  addWords: function(sourceWord, translationWord){
    this.word.push({
      sourceWord: sourceWord,
      translationWord: translationWord
  });
  view.displayWords();
 },
  deleteWord: function(position) {
    this.word.splice(position, 1);
  },
}

var handlers = {
  addWords: function(){
    var errorElement = document.getElementById('emptyErrorMessage')
    var addSourceWord = document.getElementById('source-word');
    var addTranslationWord = document.getElementById('translation-word');
    if (addSourceWord.value && addTranslationWord.value != '' ){
      words.addWords(addSourceWord.value, addTranslationWord.value);
      addSourceWord.value = '';
      addTranslationWord.value = '';
      errorElement.innerHTML ='';
    } else {
      view.displayError();
      addSourceWord.value = '';
      addTranslationWord.value = '';
    }

  },
  deleteWord: function (position){
    words.deleteWord(position);
    view.displayWords();
  },
  processString: function(){
    var translationResults = document.getElementById("translation-result");
    var textToTranslate = document.getElementById('translate-box');
    var translatedText = textToTranslate.value;
    for (var i = 0; i < words.word.length; i++){
        // split(search).join(replacement);
          translatedText = translatedText.split(words.word[i].sourceWord).join(words.word[i].translationWord);
        }
    translationResults.innerHTML = translatedText;
    }
}

var view = {
  displayWords: function(){
    var knownWordsUL = document.querySelector('ul');
    knownWordsUL.innerHTML = '';
    for ( var i = 0; i < words.word.length; i++ ){
      var wordsLi = document.createElement('li');
      var sourceWordText = words.word[i].sourceWord;
      var translationWordText = words.word[i].translationWord;
      var arrowBetweenWords = ' => ';
      var sourceAndTranslation = sourceWordText + arrowBetweenWords +translationWordText;
      wordsLi.id = i;
      wordsLi.textContent = sourceAndTranslation;
      wordsLi.appendChild(this.createDeleteButton());
      knownWordsUL.appendChild(wordsLi);
      }
    },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton'
    return deleteButton;
  },
  displayError: function(){
    var errorElement = document.getElementById('emptyErrorMessage');
    errorElement.innerHTML="Error! Please fill in both fields to continue";
  },
  noTextError: function(){
    var errorElement = document.getElementById('emptyErrorMessage');
    errorElement.innerHTML="Error! Please write a text to translate to continue";

  }
}

// Event listener on Ul to watch for any click on buttons
var wordsUl = document.querySelector('ul');
wordsUl.addEventListener('click', function(event){
  // get the element that was clicked on
  var elementClicked = event.target
  // check if element clicked is a delete button
  if (elementClicked.className === 'deleteButton'){
    //Parse the element id into an integer then send it to the handlers
    handlers.deleteWord(parseInt(elementClicked.parentNode.id));
  }
});

var translateButton = document.getElementById('translationButton');
var translationBox = document.getElementById('translate-box');

translateButton.addEventListener('click', function(){
  if (translationBox.value === ''){
    view.noTextError();
  } else {
    handlers.processString();
  }

});
