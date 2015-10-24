angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PetaCtrl', function($scope,$ionicModal) {
	// No need for testing data anymore
  $scope.laporans = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-laporan.html', function(modal) {
    $scope.laporanModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createLaporan = function(laporan) {
    $scope.laporans.push({
    	nama: laporan.nama,
    	telepon: laporan.telepon,
    	tipe: laporan.tipe,
    	deskripsi: laporan.deskripsi
    });
    $scope.laporanModal.hide();
    laporan.nama = "";
  };

  // Open our new task modal
  $scope.newLaporan = function() {
    $scope.laporanModal.show();
  };

  // Close the new task modal
  $scope.closeNewLaporan = function() {
    $scope.laporanModal.hide();
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('UrgentCtrl', function($scope, $stateParams) {
	/*
	$scope.callnumber = function(number) {
		window.plugins.CallNumber.callNumber(onSuccess,onError,number);
	}
	function onSuccess()
	{
	    alert('onSuccess');
	}
	function onError()
	{
	 	alert('onError');
	}
	*/
})