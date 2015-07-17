$(function() {

// initialize globalPatch to empty patch;
var webpdPatch;
  
var _startPatch = function() {
  $('#pp-btn-stop').removeClass('active');
  $('#pp-btn-play').addClass('active');
  Pd.start();
};

var _stopPatch = function () {
  $('#pp-btn-stop').addClass('active');
  $('#pp-btn-play').removeClass('active');
  Pd.stop();
};

var _resetObjFields = function() {
  var numFields = 5;
  $('.obj-field').removeClass('hidden');
  for (var i=0; i<numFields; i++) {
    $('.pp-obj'+i).val('Obj'+i);
  }
}

// Display first 5 messages into patch panel
var _getPatchMessages = function(){
  var patch = webpdPatch;
  var objIndex = 0, divClass,
      nodeName, msgs = [],
      dupMsg, i=0, j, numObjs = 5;

  _resetObjFields();
  while (i<patch.objects.length && objIndex < numObjs) {
    node = patch.objects[i];
    switch (node.type) {
      case 'receive':
      dupMsg = false;   j = 0;
      while (!dupMsg && j < msgs.length) {
        if (node.name === msgs[j]) {
          dupMsg = true;
        }
        j += 1;
      }
      //debugger;
      if (!dupMsg) {
        divClass = '.pp-obj' + objIndex;
        $(divClass).val(node.name);
        $(divClass).attr('id', 'obj'+node.id);
        objIndex += 1;
        msgs.push(node.name);
      }
      default:
      //console.log('type: ', node.type, 'id: ', node.id);
      break;
    }
    i += 1;
  }
//    //debugger;
}

//Listen for Object field inputs
$('.obj-field').keydown(function(event) {
  var objId, val, nodeName, floatVal;
  if (event.keyCode == 13) {
    event.preventDefault();
    // get the Object id without 'obj'
    objId = event.currentTarget.id.substr(3);
    val = $('#'+event.currentTarget.id).val();
    nodeName = webpdPatch.objects[objId].name;
    
    floatVal = parseFloat(val);
    Pd.send(nodeName, [floatVal]);
    return false;
  }
});

// debugging
var _inspectPatch = function(){
  var patch = webpdPatch;
  for (var i=0; i<patch.objects.length; i++) {
    node = patch.objects[i];
    //console.log(node.type);
  }
  //debugger;
}
  
var _loadPatch = function () {
  // kill the current patch;
  // TBD: Fix a bug in the vendor library webpdlatest
  // In method this.destroyOscillator that throws an
  // error if the current patchhas already been stopped.
  // Workaround is not to stop the patch before choosing
  // another patch. 
  if (webpdPatch) {
    _stopPatch();
    delete Pd._glob.patches[webpdPatch.patchId];
    webpdPatch = null;
    $('.obj-field').addClass('hidden');
  }

  var pathToFiles = [];
  for (var i=0; i<arguments.length; i++) {
    pathToFiles.push(arguments[i]);
  }

  $.get(pathToFiles[0], function(mainStr) {
      // handle one subpatch for now
    if (pathToFiles.length > 1) {
      $.get(pathToFiles[1], function(pinkStr) {
        Pd.registerAbstraction('pink~', pinkStr);
        webpdPatch = Pd.loadPatch(mainStr);
        _startPatch();
        Pd.send(webpdPatch.patchId + '-diameter', [20]);
        Pd.send(webpdPatch.patchId + '-frequency', [600]);
        $('#pdCanvas').html(pdfu.renderSvg(pdfu.parse(mainStr), {svgFile: false, ratio: 1.5}))
        $('#pp-btn-play').fadeIn(200);
        $('#pp-btn-stop').fadeIn(200);
        _getPatchMessages();
      });
    } else {
      webpdPatch = Pd.loadPatch(mainStr);
      $('#pdCanvas').html(pdfu.renderSvg(pdfu.parse(mainStr), {svgFile: false, ratio: 1.5}))
      $('#pp-btn-play').fadeIn(200);
      $('#pp-btn-stop').fadeIn(200);
      _startPatch();
      _getPatchMessages();
    }
  })
}

  // Remove Patch Panel controls & fields until Patch Data loaded by user
  $('.obj-field').addClass('hidden');
  $('#pp-btn-play').fadeOut();
  $('#pp-btn-stop').fadeOut();
  $('#pp-btn-patch').fadeOut();
  $('#pp-btn-demo').fadeOut();
  
  // Init Patch Panel Listeners
  $('#pp-btn-play').click(function () {
    _startPatch();
  });

  $('#pp-btn-stop').click(function () {
    $('#pp-btn-play').removeClass('active');
    $('#pp-btn-stop').addClass('active');
    _stopPatch();
  });


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
    var pathToFile = [];
    pathToFile.push('abstractions/pd/main.pd');
    pathToFile.push('abstractions/pd/pink~.pd');
    _loadPatch(pathToFile[0], pathToFile[1]);
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
    $('.object-field').addClass('hidden');  // hide the object fields
    $('#nav-patch').removeClass('active');
    $('#nav-demo').addClass('active');
    $('.no-patch').remove();
    $('.alert').remove();
    $('#pp-btn-demo').fadeIn();
    $('#pp-btn-patch').fadeIn();
    //var pathToFile = 'gui-controls/pd/main.pd';
    var pathToFile = [];
    pathToFile.push('abstractions/pd/main.pd');
    pathToFile.push('abstractions/pd/pink~.pd');
    _loadPatch(pathToFile[0], pathToFile[1]);
    //_loadPatch(pathToFile);
  });

  $('#nav-patch a').click(function(e) {
    $('.object-field').addClass('hidden');  // hide the object fields
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


