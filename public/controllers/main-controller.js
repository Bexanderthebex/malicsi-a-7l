(() => {
    angular.module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$http', '$route'];

    function MainCtrl($scope, $http, $route) {
    	$scope.activeTab = 'home'; // Home Tab
    	$scope.changeActiveTab = changeActiveTab;
    	$scope.initTab = initTab;

    	/*
			Tabs
			home = Home
			gamefeed = Games
			orgsfeed = Organizations
			user = User
			other = Other pages

    	*/

    	function initTab(){
    		$scope.activeTab = 'home'; // Home Tab
    		var newTab = $scope.activeTab;
			// changeActiveTab(newTab);
    	}

  //   	$scope.$on('$routeChangeStart', function(next, current) { 
		// 	var newTab = $scope.activeTab;
		// 	console.log("routechanged");
		// 	changeActiveTab(newTab);
		// });


    	function changeActiveTab(tab){
            $(document).ready(function(){ 
                console.log("close ka naman");
                $('.modal').modal('close');; 
            });
    		console.log(tab);
    		$scope.activeTab = tab;
    		if(tab === 'home'){
    			$('.bluenavbtn').css('color', '#00415a');
    			$('.usertab').css('color', 'white');
    			$('.hometab').css('color', '#00719c');
    			console.log("helluh");
    		}else if(tab === 'gamefeed'){
    			$('.bluenavbtn').css('color', '#00415a');
    			$('.usertab').css('color', 'white');
    			$('.gamestab').css('color', '#00719c!important');
    		}else if(tab === 'orgsfeed'){
    			$('.bluenavbtn').css('color', '#00415a');
    			$('.usertab').css('color', 'white');
    			$('.orgstab').css('color', '#00719c!important');
    		}else if(tab === 'user'){
    			$('.bluenavbtn').css('color', '#00415a');
    			$('.usertab').css('color', 'white');
    		}else{
    			$('.bluenavbtn').css('color', '#00415a');
    			$('.usertab').css('color', 'white');
    		}
    	}


        
    }
})();