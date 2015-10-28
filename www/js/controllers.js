var API_URL = "http://8e40ee8f.ngrok.io";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('PetaCtrl', function ($scope,$ionicModal,$cordovaGeolocation) {
	

})

.controller('AwasiCtrl', function($scope, $stateParams) {
  
  $scope.loadNew = function(awal,jumlah){
    var ajaxURL= API_URL + 'api_latest?awal='+awal+'&jumlah='+jumlah;
    $.get(ajaxURL,function(mData){
      var data = JSON.parse(mData);
      for(var i in data){
        var newData = '<div style="margin-top : 5px;"></div><div class="item" style="box-shadow: 0px 1px 2px #888888;"><div class="text-center"></div><div class="text-left" ><h2>'+data[i].tipe+'</h2></div>'+data[i].kecamatan+' , '+data[i].tanggal+'<p style="white-space :normal;">'+data[i].deskripsi+'</p></div>';
        $("#latest").append(newData);
      }
    });  
  };

  $scope.loadNew(0,10);

})

.controller('UrgentCtrl', function($scope, $stateParams) {
	
	$scope.callnumber = function(number) {
		window.plugins.CallNumber.callNumber(onSuccess,onError,number);
	}
	function onSuccess()
	{
	}
	function onError()
	{
	}
	
})

.controller('MapCtrl', function ($scope, $state, $cordovaGeolocation,$ionicModal) {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var ajaxURL= API_URL + 'api_all/';
      $.get(ajaxURL,function(mData){
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   
        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
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
          if(tipe.indexOf('Premanisme') >= 0){
            iconURL = 'img/icon-premanisme.png';
          }
          else if(tipe.indexOf('Pencurian') >= 0 ){
            iconURL = 'img/icon-pencurian.png';
          }
          else if(tipe.indexOf('Penipuan') >= 0 ){
            iconURL = 'img/icon-penipuan.png';
          }
          else if(tipe.indexOf('Penculikan') >= 0 ){
            iconURL = 'img/icon-penculikan.png';
          }
          var iconKategori = new google.maps.MarkerImage(
            'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new google.maps.Size(32, 32)
          );

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(datum.lat,datum.lng),
            content : "<b>Deskripsi</b> : <p style='width : 300px;'>"+ datum.deskripsi + "</p><img style='padding-left : 75%;'src='"+iconURL+"' />",
            icon : iconKategori,
          });

          google.maps.event.addListener(marker, 'click', function() {
            var infowindow = new google.maps.InfoWindow({});
            infowindow.setContent(this.content);
            infowindow.open(map, this);
          });
          
          markers.push(marker);
        }
        var markerClusterer = new MarkerClusterer(map, markers, mcOptions);
        $scope.map = map;
      });

      $ionicModal.fromTemplateUrl('new-laporan.html', function(modal) {
        $scope.laporanModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      // Called when the form is submitted
      $scope.tipe="1";
      $scope.createLaporan = function(laporan) {
          var ajaxURL= API_URL + 'api_post';
          var postData = {nama : laporan.nama,telepon : laporan.nomor,tipe_id : laporan.tipe, deskripsi : laporan.deskripsi, lat : position.coords.latitude, lng : position.coords.longitude};
          var postParam = {url : ajaxURL,data : postData};
          console.log(postData);
          $.post(ajaxURL,postData,function(mData){
            var data = JSON.parse(mData);
            console.log(data);
            alert("Laporan Berhasil Dikirimkan!");
          });

        $scope.laporanModal.hide();
        laporan.tipe = "1";
        laporan.deskripsi = "";
      };

      // Open our new task modal
      $scope.newLaporan = function() {
        $scope.laporanModal.show();
      };

      // Close the new task modal
      $scope.closeNewLaporan = function() {
        $scope.laporanModal.hide();
      };

      
    },function(error){
      console.log("Could not get location");
    });
})

.controller('ProfileCtrl',function ($scope,$cordovaGeolocation){
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var ajaxURL = API_URL+'get_profile?lat='+position.coords.latitude+'&lng='+position.coords.longitude;
    $.get(ajaxURL,function(mData){
      console.log(mData);
      var data = JSON.parse(mData);
      $('#profile').append('<p style="white-space :normal;">Anda sedang berada di Kecamatan <b>'+data.kecamatan+'.</b> Berhati-hatilah, sistem kami mencatat ada '+data.jumlah+' laporan kejahatan.</p><p style="white-space :normal;">Daerah terawan saat ini:<b>'+data.top_1+','+data.top_2+','+data.top_3+'</b></p>');
    });
  });
})
.controller('ChartCtrl', function($scope){
  $scope.tipe="1";
  $scope.kecamatan="1";
  $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    }

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line'
            }
        },
        series: [{
            data: [232, 270, 342, 289, 300]
        }],
        title: {
            text: 'Diagram persebaran kejahatan'
        },
        loading: false,
        xAxis : {
          type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Waktu',
            }
        },
        yAxis : {
          title: {
                text: 'Jumlah Kejahatan',
          }
        }
    }

});