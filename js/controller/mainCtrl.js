app.controller("MainCtrl", function($scope, $http, ezfb){
	$(".button-collapse").sideNav({closeOnClick: true});

	function updateApiMe () {
	    ezfb.api('/me', function (res) {
	    	console.log(res);
	      $scope.apiMe = res;
	    });
	  }

	function updateLoginStatus (more) {
	    ezfb.getLoginStatus(function (res) {
	    	console.log(res);
	      $scope.loginStatus = res;

	      (more || angular.noop)();
	    });
	  }

	$scope.login = function(){
		ezfb.login(function (res) {
	      console.log(res);
	      if (res.authResponse) {
	        updateLoginStatus(updateApiMe);
	      }
	    }, {scope: 'email,user_likes'});
	}

});