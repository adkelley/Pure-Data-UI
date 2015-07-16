$(function() {

// initialize globalPatch to empty patch;
var globalPatch = Pd.createPatch();
  
var _playPatch = function() {
  Pd.start();
};

var _stopPatch = function () {
  Pd.stop();
};

var _loadPatch = function () {
  // kill the current patch;
  debugger;
  Pd.destroyPatch(globalPatch);
  debugger;

  var pathToFiles = [];
  for (var i=0; i<arguments.length; i++) {
    pathToFiles.push(arguments[i]);
  }

  $.get(pathToFiles[0], function(mainStr) {
    //debugger;
    if (pathToFiles.length > 1) {
    } else {
      globalPatch = Pd.loadPatch(mainStr);
      $('#pdCanvas').html(pdfu.renderSvg(pdfu.parse(mainStr), {svgFile: false, ratio: 1.5}))
      $('#pp-btn-play').fadeIn(200);
      $('#pp-btn-stop').fadeIn(200);
    }
  })
  // TBD: Better error checking
  // .done(function() {
  //   if (patch) {
  //     result = true;
  //     console.log("Patch successfully loaded")
  //   } else {
  //     console.log("Patch did not load");
  //   }
  // })
  // .fail(function() {
  //   console.log("Something went wrong with loading the patch");
  // });
}

  // Remove Patch Panel controls until Patch Data loaded by user
  $('#pp-btn-play').fadeOut();
  $('#pp-btn-stop').fadeOut();
  $('#pp-btn-patch').fadeOut();
  $('#pp-btn-demo').fadeOut();
  
  // Init Patch Panel Listeners
  $('#pp-btn-play').click(function () {
    $('#pp-btn-stop').removeClass('active');
    $('#pp-btn-play').addClass('active');
    _playPatch();
  });

  $('#pp-btn-stop').click(function () {
    $('#pp-btn-play').removeClass('active');
    $('#pp-btn-stop').addClass('active');
    _stopPatch();
  });

  // var loadDemoPatch = function(pathToFile) {
  //   $('#pp-btn-patch').fadeOut();
  //   $('#pp-btn-demo').fadeIn();
  //   _loadPatch(pathToFile)
  //   $('#pp-btn-play').fadeIn(200);
  //   $('#pp-btn-stop').fadeIn(200);
  // }

  // Listen for Demo Menu Clicks
  $('#pp-ddm-demo-d1').click(function(e){
    var pathToFile = 'gui-controls/pd/main.pd';
    _loadPatch(pathToFile);
  });
  $('#pp-ddm-demo-d2').click(function(e){
    var pathToFile = 'delays/pd/main.pd';
    _loadPatch(pathToFile);
  });
  $('#pp-ddm-demo-d3').click(function(e){
    var pathToFile = 'phasor/pd/main.pd';
    _loadPatch(pathToFile);
  });
  $('#pp-ddm-demo-d4').click(function(e){
    var pathToFile = 'gui-controls/pd/main.pd';
    _loadPatch(pathToFile);
  });
  $('#pp-ddm-demo-d5').click(function(e){
    var pathToFile = 'gui-controls/pd/main.pd';
    _loadPatch(pathToFile);
  });

  // Listen for Patch Menu Clicks
  $('#pp-ddm-patch-import a').click(function(e) {
    //e.preventDefault ();
    // pathToFile = _importPatch();
    // if (pathToFile) {
    //   if (_loadPatch(pathToFile)) {
    //     $('#cp-btn-play').fadeIn(200);
    //     $('#cp-btn-stop').fadeIn(200);
    //   } else {
    //     // Message that the demo failed to load
    //     console.log("Something went wrong!");
    //   }
    // } else {
    //   console.log("Something went wrong!");
    // }
  });

  $('#nav-demo a').click(function(e) {
    $('#nav-patch').removeClass('active');
    $('#nav-demo').addClass('active');
    $('.no-patch').remove();
    $('.alert').remove();
    $('#pp-btn-demo').fadeIn();
    $('#pp-btn-patch').fadeIn();
    var pathToFile = 'gui-controls/pd/main.pd';
    _loadPatch(pathToFile);
  });

  $('#nav-patch a').click(function(e) {
    var pathToFile = 'main.pd';
    $('#nav-patch').addClass('active');
    $('#nav-demo').removeClass('active');
    $('.no-patch').remove();
    $('.alert').remove();
    $('svg').remove();
    $('#pp-btn-demo').fadeIn();
    $('#pp-btn-patch').fadeIn();
    $('#pp-btn-play').fadeOut();
    $('#pp-btn-stop').fadeOut();
    
  });
});


