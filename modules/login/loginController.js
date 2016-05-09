app.controller('loginController', function($scope, $state, $rootScope) {
    $scope.login = function(){
        $state.go('main.home');
    };
    
    $scope.cleanWarning = function() {
        $rootScope.loginError = false;
        $rootScope.blocked = false;
    };
});