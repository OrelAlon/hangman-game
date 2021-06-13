let hangmanApp = angular.module('hangmanApp', []);

// 'JavaScript', 'React', 'Html', 'NodeJS', 'AngularJS'
hangmanApp.controller('gameCtrl', [
  '$scope',
  '$timeout',
  function ($scope, $timeout) {
    let storeWords = ['javascript', 'react', 'html', 'nodejs', 'angularjs'];

    $scope.screen = 'initial';
    $scope.secretWord = '';
    $scope.incorrectGuess = [];
    $scope.correctGuess = [];
    $scope.guesses = 6;

    let selectRandomWord = function () {
      let index = Math.round(Math.random() * storeWords.length);
      return storeWords[index];
    };

    let newGame = function () {
      $scope.screen = 'initial';

      $scope.incorrectGuess = [];
      $scope.correctGuess = [];
      $scope.secretWord = '';
      $scope.guesses = 5;

      $scope.msg = '';

      selectedWord = selectRandomWord();
      console.log(selectedWord);
      let tempSecretWord = '';
      for (let i = 0; i < selectedWord.length; i++) {
        tempSecretWord += '-';
      }
      $scope.secretWord = tempSecretWord;
    };

    $scope.guess = function () {
      if ($scope.inputL.length > 1) {
        $scope.msg = 'no more then 1';
        return;
      }
      $scope.msg = '';
      for (i = 0; i < $scope.correctGuess.length; i++) {
        if (
          $scope.correctGuess[i].toLowerCase() == $scope.inputL.toLowerCase()
        ) {
          $scope.inputL = '';
          return;
        }
      }

      for (i = 0; i < $scope.incorrectGuess.length; i++) {
        if (
          $scope.incorrectGuess[i].toLowerCase() == $scope.inputL.toLowerCase()
        ) {
          $scope.inputL = '';
          return;
        }
      }
      console.log(selectedWord);

      let correct = false;

      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i].toLowerCase() == $scope.inputL.toLowerCase()) {
          $scope.secretWord =
            $scope.secretWord.slice(0, i) +
            $scope.inputL +
            $scope.secretWord.slice(i + 1);
          correct = true;
        }
      }

      if (correct) {
        $scope.correctGuess.push($scope.inputL.toLowerCase());
      } else {
        $scope.guesses--;
        $scope.incorrectGuess.push($scope.inputL.toLowerCase());
      }

      $scope.inputL = '';

      if ($scope.secretWord.indexOf('-') == -1) {
        $scope.screen = 'won';
        $timeout(function () {
          newGame();
        }, 2500);
      }

      if ($scope.guesses == 0) {
        $scope.screen = 'lost';
        $timeout(function () {
          newGame();
        }, 2000);
      }
    };
    newGame();
  },
]);
