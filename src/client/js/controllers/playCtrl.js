(function () {

  'use strict';

  angular.module('myApp')
    .controller('playCtrl', playCtrl);

  playCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location','dataService', 'authService'];

  function playCtrl($rootScope, $scope, $routeParams, $location, dataService, authService) {

    $rootScope.user = {};
    $rootScope.loggedIn = true;
    $rootScope.user.username = JSON.parse(authService.getUserName());

    var memberId = authService.getUserID();
    var token = authService.getUserToken();

    dataService.getCardsByDeck($routeParams.deckid, token).then(function(cards){
      console.log(cards);
      $rootScope.current_deck = cards.data.data;
      $scope.current_cardID = $routeParams.cardid;
      $scope.showAnswer = false;
      $rootScope.current_card = $rootScope.current_deck[$scope.current_cardID -1];
    });

    $scope.nextCard = function () {
      if ($scope.current_cardID < $rootScope.current_deck.length) {
        $scope.current_cardID++;
        $location.path('/play/'+ $routeParams.deckid + '/' + $scope.current_cardID);
      }
    }
    $scope.prevCard = function () {
      if ($scope.current_cardID > 1) {
        $scope.current_cardID--;
        $location.path('/play/'+ $routeParams.deckid + '/' + $scope.current_cardID);
      }
    }
  };

})();