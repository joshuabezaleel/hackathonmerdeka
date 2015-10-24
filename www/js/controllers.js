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
	
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var ajaxURL='http://localhost:8000/iscrime/api_all/';
  $.get(ajaxURL,function(mData){
    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
   
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      mcOptions = {gridSize: 50, maxZoom: 16};
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      markers = [];
      var total=0;
      var data = JSON.parse(mData);
      for(var i in data){
        var datum = data[i];
        var tipe = data[i].tipe;
        var iconURL = 'img/icon-lainnya.png';
        if(tipe.indexOf('Premanisme')){
          iconURL = 'img/icon-premanisme.png';
        }
        else if(tipe.indexOf('Pencurian')){
          iconURL = 'img/icon-pencurian.png';
        }
        else if(tipe.indexOf('Penipuan')){
          iconURL = 'img/icon-penipuan.png';
        }
        else if(tipe.indexOf('Penculikan')){
          iconURL = 'img/icon-penculikan.png';
        }
        var iconKategori = new google.maps.MarkerImage(
          iconKategori,
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(32, 32)
        );

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(datum.lat,datum.lng),
          content : "<b>Deskripsi</b> : <p style='width : 300px;'>"+ datum.deskripsi + "</p><img src='http://localhost:8100/"+iconURL+"' />",
          icon : iconKategori,
        });

        google.maps.event.addListener(marker, 'click', function() {
          var infowindow = new google.maps.InfoWindow({});
          infowindow.setContent(this.content);
          infowindow.open(map, this);
        });
        
        markers.push(marker);
      }
      console.log("Lewat sini");
      var markerClusterer = new MarkerClusterer(map, markers, mcOptions);
      $scope.map = map;
    }, function(error){
      console.log("Could not get location");
    });
  });
});