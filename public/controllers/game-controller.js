'use strict';

(() => {

	angular
		.module('app')
		.controller('GameController', GameController);

	GameController.$inject = ['$scope', '$routeParams', '$filter', '$location', 'GameService', 'UserService', 'SearchService'];

	function GameController($scope, $routeParams, $filter, $location, GameService, UserService, SearchService) {
		$scope.thisGame = {
			game_id: $routeParams.gameId
		};
		$scope.addZero = addZero;
		$scope.addSport = addSport;
		$scope.resetAddSportForm = resetAddSportForm;
		$scope.resetUpdateSportForm = resetUpdateSportForm;
		$scope.deleteSport = deleteSport;
		$scope.updateSport = updateSport;
		$scope.retrieveAllSports = retrieveAllSports;
		$scope.searchSport = searchSport;
		$scope.passSport = passSport;
		$scope.countTeamInSport = countTeamInSport;
		$scope.viewGameOrganizerDetails = viewGameOrganizerDetails;
		$scope.viewPastMatchesInGame = viewPastMatchesInGame;
		$scope.viewOngoingMatchesInGame = viewOngoingMatchesInGame;
		$scope.viewUpcomingMatchesInGame = viewUpcomingMatchesInGame;
		$scope.retrieveMatchesInGame = retrieveMatchesInGame;
		$scope.viewOrgRankings = viewOrgRankings;
		$scope.checkRankings = checkRankings;
		$scope.checkPastMatches = checkPastMatches;
		$scope.checkOngoingMatches = checkOngoingMatches;
		$scope.checkUpcomingMatches = checkUpcomingMatches;
		$scope.viewSponsoringInstitutions = viewSponsoringInstitutions;
		$scope.viewOtherSponsoringInstitutions = viewOtherSponsoringInstitutions;
		$scope.initializeSponsoringInstitutions = initializeSponsoringInstitutions;
		$scope.checkSponsors = checkSponsors;
		$scope.passSponsorAdd = passSponsorAdd;
		$scope.passSponsorDelete = passSponsorDelete;
		$scope.checkGameDescription = checkGameDescription;
		$scope.checkGameLocation = checkGameLocation;
		$scope.addMultipleOrganizations =  addMultipleOrganizations;
		$scope.deleteMultipleOrganizations =  deleteMultipleOrganizations;
		$scope.viewAllOrganizationForGame = viewAllOrganizationForGame;
		$scope.viewAllOrganizationInGame = viewAllOrganizationInGame;
		$scope.checkAvailableOrganizations = checkAvailableOrganizations;
		$scope.checkParticipatingOrganizations = checkParticipatingOrganizations;
		$scope.checkValidOrgAdd = checkValidOrgAdd;
		$scope.checkValidOrgDel = checkValidOrgDel;
		$scope.showCheckedSponsors = showCheckedSponsors;
		$scope.addMultipleSponsors = addMultipleSponsors;
		$scope.deleteMultipleSponsors = deleteMultipleSponsors;
		$scope.checkValidSponsorAdd = checkValidSponsorAdd;
		$scope.checkValidSponsorDel = checkValidSponsorDel;
		$scope.getUserDetails = getUserDetails;
		$scope.checkIfOrganizer = checkIfOrganizer;
		$scope.checkSports = checkSports;
		$scope.mergeMatchesBeta = mergeMatchesBeta;
		$scope.checkValidAddSportStartDate = checkValidAddSportStartDate;
		$scope.checkDeleteButtonOrg = checkDeleteButtonOrg;
		$scope.initializeGamePage = initializeGamePage;
		$scope.checkDeleteButtonSpon = checkDeleteButtonSpon;

		$scope.addName = undefined;
		$scope.addMaxTeams = undefined;
		$scope.addMechanics = undefined;
		$scope.addStartTime = undefined;
		$scope.addEndTime = undefined;
		$scope.addStartDate = undefined;
		$scope.addEndDate = undefined;
		$scope.addScoringSystem = undefined;
		$scope.updateId = undefined;
		$scope.updateName = undefined;
		$scope.updateMaxTeams = undefined;
		$scope.updateMechanics = undefined;
		$scope.updateStartTime = undefined;
		$scope.updateEndTime = undefined;
		$scope.updateStartDate = undefined;
		$scope.updateEndDate = undefined;
		$scope.updateWinner = undefined;
		$scope.updateScoringSystem = undefined;
		$scope.updateGameId = undefined;
		$scope.gameStartDate = undefined;
		$scope.gameEndDate = undefined;
		$scope.user = {};
		$scope.sport = {};
		$scope.query = undefined;
		$scope.sports = [];
		$scope.sportCopy = {};
		$scope.game = {};
		$scope.gameOrganizer = {};
		$scope.pastMatches = [];
		$scope.ongoingMatches = [];
		$scope.upcomingMatches = [];
		$scope.temp = [];
		$scope.match_id_tracker = [];
		$scope.organizationRanks = [];
		$scope.availableOrgs = [];
		$scope.participatingOrgs = [];
		$scope.tempOrgs = [];
		$scope.validOrgAdd = false;
		$scope.validOrgDel = false;
		$scope.sponsors = [];
		$scope.otherSponsors = [];
		$scope.checkedSponsors = [];
		$scope.checkedSponsorsAdd = [];
		$scope.checkedSponsorsDel = [];
		$scope.validSponsorAdd = false;
		$scope.validSponsorDel = false;
		$scope.sponsorAdd = {};
		$scope.sponsorCopy = {};
		$scope.newOrg = {
			org_name: undefined,
			org_rank: undefined
		}


		$scope.newSport = {
			sportName: undefined,
			mechanics: undefined,
			timeStart: undefined,
			timeEnd: undefined,
			startDate: undefined,
			endDate: undefined,
			maxTeams: undefined,
			scoringSystem: undefined,
			gameID: $scope.thisGame.game_id
		};

		//add existing sponsor to game
		$scope.newSponsorGame = {
			sponsorId: undefined,
			gameId: undefined,
			name: undefined,
			description: undefined,
			checked: false
		}




		$scope.mergedMatch = {
			team1_id: undefined,
			team1_name: undefined,
			match_id: undefined,
			team2_id: undefined,
			team2_name: undefined,
			time_start: undefined,
			time_end: undefined,
			match_date: undefined,
			match_id: undefined
		}

		$scope.teams = {
			name: undefined,
			description: undefined
		}

		$scope.mergedMatchBeta = {
			teams: [],
			match_id: undefined,
			time_start: undefined,
			time_end: undefined,
			match_date: undefined,
			match_id: undefined,
			// sport_name: undefined
		}

		$scope.newOrganizationInGame = {
			orgId: undefined,
			gameId: $scope.thisGame.game_id,
			name: undefined,
			checked: false
		}

		$scope.organizationInGame = {
			orgId: undefined,
			gameId: $scope.thisGame.game_id
		};

		$scope.selectedScoring = undefined;
		$scope.scoringSystemPresets = ["Tally Score", "Round Robin", "Elimination"];


		function addSport() {
			var newSport = {
				sportName: $scope.addName,
				mechanics: $scope.addMechanics,
				timeStart: $filter('date')($scope.addStartTime, "HH:mm:ss"),
				timeEnd: $filter('date')($scope.addEndTime, "HH:mm:ss"),
				startDate: $filter('date')($scope.addStartDate, "yyyy-M-d"),
				endDate: $filter('date')($scope.addEndDate, "yyyy-M-d"),
				maxTeams: $scope.addMaxTeams,
				scoringSystem: $scope.addScoringSystem,
				gameID: $scope.thisGame.game_id
			};


			// console.log(newSport);
			GameService
				.addSport(newSport)
				.then(function (res){
					// console.log("added");
					Materialize.toast("Successfully added the sport!", 3000);
					resetAddSportForm();
					retrieveAllSports();
				}, function(err) {
					// console.log(err);
					Materialize.toast("Failed to add the sport!", 3000);
				})
		}

		function addZero(i) {
			if (i < 10) {
				i = "0" + i;
			}
			return i;
		}

		function checkSports(){
			if($scope.sports.length == 0) return true;
			else false;
		}

		function checkRankings(){
			if($scope.organizationRanks.length == 0 ) return true;
			else false;
		}
		function checkPastMatches(){
			if($scope.pastMatches.length == 0 ) return true;
			else false;
		}
		function checkOngoingMatches(){
			if($scope.ongoingMatches.length == 0 ) return true;
			else false;
		}
		function checkUpcomingMatches(){
			if($scope.upcomingMatches.length == 0 ) return true;
			else false;
		}
		function checkSponsors(){
			if($scope.sponsors.length == 0 ) return true;
			else false;
		}
		function checkGameDescription(){
			if($scope.game.description == undefined) return true;
			else false;
		}
		function checkGameLocation(){
			if($scope.game.location == undefined) return true;
			else false;
		}
		function checkAvailableOrganizations(){
			if($scope.availableOrgs.length == 0) return true;
			else false;
		}

		function checkParticipatingOrganizations(){
			if($scope.participatingOrgs.length == 0) return true;
			else false;
		}
		function checkIfOrganizer(){
			if($scope.user.type=="A") return true;
			else if ($scope.user.id==$scope.game.organizer_id) return true;
			else return false;
		}


		function checkValidSponsorAdd(){
			var countAdd=0;
			for(var i = 0; i<$scope.otherSponsors.length; i++){
				if($scope.otherSponsors[i].checked==true) countAdd++;
			}
			if(countAdd>0) $scope.validSponsorAdd=true;
			else $scope.validSponsorAdd=false;
		}



		function checkValidSponsorDel(){
			var countDel=0;
			for(var i = 0; i<$scope.sponsors.length; i++){
				if($scope.sponsors[i].checked==true) countDel++;
			}
			if(countDel>0) $scope.validSponsorDel=true;
			else $scope.validSponsorDel=false;
		}

		function checkValidOrgAdd(){
			var countAdd=0;
			for(var i = 0; i<$scope.availableOrgs.length; i++){
				if($scope.availableOrgs[i].checked==true) countAdd++;
			}
			if(countAdd>0) $scope.validOrgAdd=true;
			else $scope.validOrgAdd=false;
		}

		function checkValidOrgDel(){
			var countAdd=0;
			for(var i = 0; i<$scope.participatingOrgs.length; i++){
				if($scope.participatingOrgs[i].checked==true) countAdd++;
			}
			if(countAdd>0) $scope.validOrgDel=true;
			else $scope.validOrgDel=false;
		}

		function checkValidAddSportStartDate(){
			if($scope.gameStartDate > $scope.addStartDate){
				return false;
			}
			else return true;
		}

		function checkDeleteButtonOrg(){
			//if organizer and there are orgs to delete
			if(checkIfOrganizer() && !checkParticipatingOrganizations()) return true;
			else return false;
		}

		function checkDeleteButtonSpon(){
			//if organizer and there are sponsors to delete
			if(checkIfOrganizer() && !checkSponsors()) return true;
			else return false;
		}

		function getUserDetails(){
			UserService
				.getUserInfo()
				.then(function(res){
					// console.log("user details retrieved");
					console.log(res);
					$scope.user = res.data;
				}, function(err){
					// console.log(err);
					Materialize.toast("Failed to get user details!", 3000);
				})
		}


		function addMultipleOrganizations(){
		   var newOrganizations = [];
		   for(var i = 0; i<$scope.availableOrgs.length; i++){
				if($scope.availableOrgs[i].checked==true) newOrganizations.push($scope.availableOrgs[i]);
		   }
		   GameService
				.addMultipleOrganizations(newOrganizations)
				.then(function (res){
					// console.log("added organizations to game");
					$scope.availableOrgs = [];
					$scope.participatingOrgs =[];
					viewAllOrganizationForGame();
					viewAllOrganizationInGame();
					checkValidOrgAdd();
					Materialize.toast("Successfully added the organizations!", 3000);
				}, function(err) {
					// console.log(err);
					Materialize.toast("Failed to add the organizations!", 3000);
				})
		}



		function passSport(sport){
				$scope.updateId = sport.sport_id;
				$scope.updateName = sport.sport_name;
				$scope.updateMechanics = sport.mechanics;
				$scope.updateWinner = sport.winner;
				$scope.updateStartTime = new Date(sport.start_date+"T"+sport.time_start+"+08:00");
				//uses same date for form validation. end time > start time
				$scope.updateEndTime =  new Date(sport.start_date+"T"+sport.time_end+"+08:00"); 
				$scope.updateStartDate =  new Date(sport.start_date+"T"+"00:00:00"+"+08:00");
				$scope.updateEndDate =  new Date(sport.end_date+"T"+"00:00:00"+"+08:00");
				$scope.updateMaxTeams =  sport.max_teams;
				$scope.updateScoringSystem =  sport.scoring_system;
				$scope.updateGameId = sport.game_id;


			// console.log(sport);
		}

		function passSponsorAdd(sponsor){
			// console.log(JSON.parse(sponsor));
			let parsed = JSON.parse(sponsor);
			$scope.sponsorAdd = {
				name: parsed.name,
				description: parsed.description,
				sponsor_id: parsed.sponsor_id
			}
			// console.log($scope.sponsorAdd);
		}

		function passSponsorDelete(sponsor){
			// console.log(sponsor);

			$scope.sponsorCopy = {
				name: sponsor.name,
				description: sponsor.description,
				sponsor_id: sponsor.sponsor_id,
				game_id: $scope.thisGame.game_id
			}
			// console.log($scope.sponsorCopy);
		}


		function resetAddSportForm(){
			$scope.newSport = {
				sportName: undefined,
				mechanics: undefined,
				timeStart: undefined,
				timeEnd: undefined,
				startDate: undefined,
				endDate: undefined,
				maxTeams: undefined,
				scoringSystem: undefined,
				gameID: $scope.thisGame.game_id
			};

			$scope.addName = undefined;
			$scope.addMaxTeams = undefined;
			$scope.addMechanics = undefined;
			$scope.addStartTime = undefined;
			$scope.addEndTime = undefined;
			$scope.addStartDate = undefined;
			$scope.addEndDate = undefined;
			$scope.addSportForm.$setPristine();
			$scope.addSportForm.$setUntouched();
		}

		function resetUpdateSportForm(){
			$scope.updateName = undefined;
			$scope.updateMaxTeams = undefined;
			$scope.updateMechanics = undefined;
			$scope.updateStartTime = undefined;
			$scope.updateEndTime = undefined;
			$scope.updateStartDate = undefined;
			$scope.updateEndDate = undefined;
			$scope.updateWinner = undefined;
			$scope.updateScoringSystem = undefined;
			$scope.updateGameId = undefined;
			$scope.updateSportForm.$setPristine();
		}

		function checkNameAddSport(){
			if($('#addName').val().length==0){
				$(document).ready(function(){
					$('#addName').tooltip({delay:0, position:"bottom", tooltip:"Please enter a valid name"});
				})
			}
			else
				$('#addName').tooltip("remove");
		}


		function searchSport(){
			SearchService
				.retrieveSport($scope.query)
				.then(function(res){
					// console.log("Sport search success");
					$scope.sports = [];
					var temp = res.data;

					for(var i = 0; i<temp.length; i++){
						if (temp[i].game_id==$scope.thisGame.game_id) $scope.sports.push(temp[i]);
					}

				}, function(err){
					Materialize.toast('Failed to search for sports!', 3000);
				})
		}

		function retrieveAllSports() {
			GameService
				.retrieveAllSports($scope.thisGame.game_id)
				.then(function(res) {
					$scope.sports = res.data;
					for (var i = 0; i<res.data.length; i++){
						countTeamInSport(res.data[i]);
					}
					$scope.sports = res.data;
					console.log(res.data);
				}, function(err) {
					// console.log(err);
					Materialize.toast('Failed to retrieve sports!', 3000);
				})
		}


		function deleteSport() {
			// console.log("To delete sport " + $scope.updateId);
			GameService
				.deleteSport($scope.updateId)
				.then(function(res) {
					// console.log("deleted");
					Materialize.toast('Successfully deleted the sport!', 3000);
					retrieveAllSports();
				}, function(err) {
					// console.log(err.data);
					Materialize.toast('Failed to delete sport!', 3000);
				})
		}

		function deleteMultipleOrganizations() {
			var organizations = [];
			for (var i = 0; i<$scope.participatingOrgs.length; i++){
				if ($scope.participatingOrgs[i].checked==true) organizations.push($scope.participatingOrgs[i]);
			}
			GameService
				.deleteMultipleOrganizations(organizations)
				.then(function(res) {
					$scope.availableOrgs = [];
					$scope.participatingOrgs = [];
					viewAllOrganizationForGame();
					viewAllOrganizationInGame();
					// console.log("deleted");
					Materialize.toast('Successfully deleted the organization from current game!', 3000);
				}, function(err) {
					// console.log(err.data);
					Materialize.toast('Failed to delete organization!', 3000);
				})
		}

		function updateSport() {
			var sport = {
				sport_id: $scope.updateId,
				sport_name: $scope.updateName,
				mechanics: $scope.updateMechanics,
				max_teams: $scope.updateMaxTeams,
				time_start: $scope.updateStartTime.getHours()+":"+$scope.updateStartTime.getMinutes() +":"+ $scope.updateStartTime.getSeconds(),
				time_end: $scope.updateEndTime.getHours()+ ":" +$scope.updateEndTime.getMinutes() + ":" + $scope.updateEndTime.getSeconds(),
				start_date: $scope.updateStartDate.getFullYear()+"-"+($scope.updateStartDate.getMonth()+1)+"-"+$scope.updateStartDate.getDate(),
				end_date: $scope.updateEndDate.getFullYear()+"-"+($scope.updateEndDate.getMonth()+1)+"-"+$scope.updateEndDate.getDate(),
				scoring_system: $scope.updateScoringSystem,
				game_id: $scope.updateGameId,
				winner: $scope.updateWinner
			}

			// console.log(sport);
			GameService
				.updateSport(sport)
				.then(function(res) {
					// console.log("updated");
					Materialize.toast('Successfully updated the sport!', 3000);
					resetUpdateSportForm();
					retrieveAllSports();
				}, function(err) {
					// console.log(err.data);
					Materialize.toast('Failed to update the sport!', 3000);
				})
		}



		function countTeamInSport(sport){
			GameService
				.countTeamInSport(sport.sport_id)
				.then(function(res) {

					// console.log("Team count for sport#"+sport.sport_id+": "+ res.data.team_count);
					sport.team_count = res.data.team_count;
				}, function(err){
					// console.log(err.data);
				})

		}

		function initializeGamePage(){
			GameService
				.viewGameDetails($scope.thisGame.game_id)
				.then(function(res){
					// console.log("game details retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.game = res.data;
					$scope.gameStartDate = new Date($scope.game.start_date+"T"+"00:00:00"+"Z");
					$scope.gameEndDate = new Date($scope.game.end_date+"T"+"00:00:00"+"Z");
					getUserDetails();
					viewAllOrganizationInGame();
					viewAllOrganizationForGame();
					viewGameOrganizerDetails();
					initializeSponsoringInstitutions();
					retrieveMatchesInGame();
				}, function(err){
					// console.log(err.data);
					$location.path("/error");
					// Materialize.toast('Failed to retrieve game details!', 3000);
				})
		}

		function viewGameOrganizerDetails(){
			GameService
				.viewGameOrganizerDetails($scope.thisGame.game_id)
				.then(function(res){
					// console.log("game organizer details retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.gameOrganizer = res.data[0];
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve game details!', 3000);
				})
		}
		function viewAllOrganizationForGame(){
			GameService
				.viewAllOrganizationForGame($scope.thisGame.game_id)
				.then(function(res){
					// console.log("Available organizations retrieved for game#"+ $scope.thisGame.game_id);
					$scope.tempOrgs = res.data;
					$scope.availableOrgs = [];
					for(var i = 0; i<$scope.tempOrgs.length; i++){
						$scope.newOrganizationInGame = {
							orgId: $scope.tempOrgs[i].organization_id,
							name: $scope.tempOrgs[i].name,
							gameId: $scope.thisGame.game_id,
							checked: false
						}
						$scope.availableOrgs.push($scope.newOrganizationInGame);
					}
					// console.log($scope.availableOrgs);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve Available Organizations!', 3000);
				})
		}

		function viewAllOrganizationInGame(){
			GameService
				.viewAllOrganizationInGame($scope.thisGame.game_id)
				.then(function(res){
					// console.log("Organizations In Game Retrieved"+ $scope.thisGame.game_id);
					$scope.tempOrgs = res.data;
					$scope.participatingOrgs = [];
					for(var i = 0; i<$scope.tempOrgs.length; i++){
						$scope.newOrganizationInGame = {
							orgId: $scope.tempOrgs[i].organization_id,
							name: $scope.tempOrgs[i].name,
							gameId: $scope.thisGame.game_id,
							checked: false
						}
						$scope.participatingOrgs.push($scope.newOrganizationInGame);
					}
					// console.log($scope.participatingOrgs);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve Organizations in Game!', 3000);
				})
		}


		function retrieveMatchesInGame(){
			viewPastMatchesInGame();
			viewOngoingMatchesInGame();
			viewUpcomingMatchesInGame();
		}

		function viewPastMatchesInGame(){
			GameService
				.viewPastMatchesInGame($scope.thisGame.game_id)
				.then(function(res){
					// console.log("past matches retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.temp = res.data;
					mergeMatchesBeta(res.data, "past");
					// console.log($scope.pastMatches);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve past matches!', 3000);
				})
		}

		function mergeMatchesBeta(data, flag){
			var match_id_tracker = [];

			//add matches first
			for (var i = 0; i<data.length; i++){
				if (match_id_tracker.indexOf(data[i].match_id)==-1) {
					var mergedMatchBeta = {
						teams: [],
						match_id: data[i].match_id,
						time_start: data[i].time_start,
						time_end: data[i].time_end,
						match_date: data[i].match_date,
                        sport_name: data[i].sport_name
					 }
					match_id_tracker.push(data[i].match_id);
					if(flag=="past")		$scope.pastMatches.push(mergedMatchBeta);
					else if(flag=="ongoing")		$scope.ongoingMatches.push(mergedMatchBeta);
					if(flag=="upcoming")		$scope.upcomingMatches.push(mergedMatchBeta);
				}

			}

			//then add the teams to the matches
			//welp, javascript is not a pass-by-reference language they said....
			if (flag=="past"){
				for(var i = 0; i<data.length; i++){
					var team = {
						name: data[i].team_name,
						team_id: data[i].team_id
					}
					for (var j = 0; j< $scope.pastMatches.length; j++){
						if($scope.pastMatches[j].match_id == data[i].match_id) {
							$scope.pastMatches[j].teams.push(team);
							break;
						}
					}
				}
			}
			else if (flag=="ongoing"){
				for(var i = 0; i<data.length; i++){
					var team = {
						name: data[i].team_name,
						team_id: data[i].team_id
					}
					for (var j = 0; j< $scope.ongoingMatches.length; j++){
						if($scope.ongoingMatches[j].match_id == data[i].match_id) {
							$scope.ongoingMatches[j].teams.push(team);
							break;
						}
					}
				}
			}
			else if (flag=="upcoming"){
				for(var i = 0; i<data.length; i++){
					var team = {
						name: data[i].team_name,
						team_id: data[i].team_id
					}
					for (var j = 0; j< $scope.upcomingMatches.length; j++){
						if($scope.upcomingMatches[j].match_id == data[i].match_id) {
							$scope.upcomingMatches[j].teams.push(team);
							break;
						}
					}
				}
			}


		}



		function viewOngoingMatchesInGame(){
			GameService
				.viewOngoingMatchesInGame($scope.thisGame.game_id)
				.then(function(res){
					// console.log("ongoing matches retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.temp = res.data;

					mergeMatchesBeta(res.data, "ongoing");
					// console.log($scope.ongoingMatches);

				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve ongoing matches!', 3000);
				})
		}
		function viewUpcomingMatchesInGame(){
			GameService
				.viewUpcomingMatchesInGame($scope.thisGame.game_id)
				.then(function(res){
					// console.log("upcoming matches retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.temp = res.data;

					mergeMatchesBeta(res.data, "upcoming");
					// console.log($scope.upcomingMatches);

				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve upcoming matches!', 3000);
				})
		}

		function viewOrgRankings(){
			GameService
				.viewOrgRankings($scope.thisGame.game_id)
				.then(function(res){
					// console.log("organization rankings retrieved for game#"+ $scope.thisGame.game_id);
					// console.log(res.data);
					$scope.tempOrgs = res.data;
					for(var i = 0; i<$scope.tempOrgs.length; i++){
						$scope.newOrg = {
							org_name: $scope.tempOrgs[i].org_name,
							org_rank: i+1
						}
						$scope.organizationRanks.push($scope.newOrg);
					}
					// console.log($scope.organizationRanks);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve organization rankings!', 3000);
				})
		}

		function initializeSponsoringInstitutions(){
			viewSponsoringInstitutions();
			viewOtherSponsoringInstitutions();
		}

		function viewSponsoringInstitutions(){
			GameService
				.viewSponsoringInstitutions($scope.thisGame.game_id)
				.then(function(res){
					// console.log("sponsoring institutions retrieved for game#"+ $scope.thisGame.game_id);
					for (var i = 0; i< res.length; i++){
						$scope.newSponsorGame = {
							sponsorId: res[i].sponsor_id,
							gameId: $scope.thisGame.game_id,
							name: res[i].name,
							description: res[i].description,
							checked: false
						};
						$scope.sponsors.push($scope.newSponsorGame);
					}

					// console.log($scope.sponsors);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve sponsoring institutions!', 3000);
				})
		}

		function viewOtherSponsoringInstitutions(){
			GameService
				.viewOtherSponsoringInstitutions($scope.thisGame.game_id)
				.then(function(res){
					// console.log("other sponsoring institutions retrieved for game#"+ $scope.thisGame.game_id);

					$scope.sponsorAdd = {};
					// $scope.otherSponsors = res;
					console.log(angular.extend($scope.otherSponsors, res));
					for (var i = 0; i< res.length; i++){
						$scope.newSponsorGame = {
							sponsorId: res[i].sponsor_id,
							gameId: $scope.thisGame.game_id,
							name: res[i].name,
							description: res[i].description,
							checked: false

						};

						$scope.otherSponsors.push($scope.newSponsorGame);
					}
					//  console.log($scope.otherSponsors);
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to retrieve sponsoring institutions!', 3000);
				})
		}


		function showCheckedSponsors(){
			for(var i=0; i<$scope.otherSponsors.length; i++){
				if($scope.otherSponsors[i].checked==true){
					$scope.checkedSponsors.push ($scope.otherSponsors[i].sponsorId);
				}
			}
			// console.log($scope.checkedSponsors);
		}

		function addMultipleSponsors(){
			// console.log("adding multiple sponsors:")
			for(var i=0; i<$scope.otherSponsors.length; i++){
				if($scope.otherSponsors[i].checked==true) $scope.checkedSponsorsAdd.push($scope.otherSponsors[i])
			}
			GameService
				.addMultipleSponsoringInstitutions($scope.checkedSponsorsAdd)
				.then(function(res){
					$scope.sponsors = [];
					$scope.otherSponsors = [];
					$scope.checkedSponsorsAdd = [];
					viewSponsoringInstitutions();
					viewOtherSponsoringInstitutions();
					checkValidSponsorAdd();
					// console.log("done adding");
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to add new sponsoring institutions!', 3000);
				})
		}

		function deleteMultipleSponsors(){
			for(var i=0; i<$scope.sponsors.length; i++){
				if($scope.sponsors[i].checked==true) $scope.checkedSponsorsDel.push($scope.sponsors[i]);
			}
			GameService
				.deleteMultipleSponsoringInstitutions($scope.checkedSponsorsDel)
				.then(function(res){
					console.log("deleted sponsoring institutions");
					$scope.sponsors = [];
					$scope.otherSponsors = [];
					$scope.checkedSponsorsDel = [];
					viewSponsoringInstitutions();
					viewOtherSponsoringInstitutions();
					checkValidSponsorDel();
					// console.log("done deleting");	
				}, function(err){
					// console.log(err.data);
					Materialize.toast('Failed to delete sponsoring institutions!', 3000);
				})
		}


	}
})();