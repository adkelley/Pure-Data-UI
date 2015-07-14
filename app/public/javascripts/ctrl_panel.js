var _playPatch = function() {
  Pd.start();
  return (isPatchLoaded()) ? true : false;
};

var _stopPatch = function () {
  Pd.stop();
  return (isPatchPlaying()) ? true : false;
};

var uploadForm = "<form id='uploadForm' enctype='multipart/form-data'" +
      "method='post' action='/api/patch'>" +
      "<input type='file' name='patch' />" +
      "<button type='submit' form='uploadForm'>Upload</button></form>";

var _importPatch = function () {
  $(uploadForm).dialog({
    autoOpen: true,
    height: 300,
    width: 350,
    modal: true,
    open: function() {
      // On open, hide the original submit button
      $( this ).find( "[type=submit]" ).hide();
    },
    buttons: [
      {
        text: "Upload",
        click: $.noop,
        type: "submit",
        form: "uploadForm" // <-- Make the association
      },
      {
        text: "Close",
        click: function() {
          $( this ).dialog( "close" );
        }
      }
    ],
    title: "Upload Patch"
  });
}

var _loadDemoPatch = function () {
  var pathToFile = 'main.pd';
  var patch;
  // $.get(pathToFile, function(mainStr) {
  //   patch = Pd.loadPatch(mainStr);
  //   $('#cp-btn-play').fadeIn(200);
  //   $('#cp-btn-play').fadeIn(200);
  // })
  $.ajax({
    url: pathToFile,
    async: true,
    dataType: 'text',
    success: function(data) {
    patch = Pd.loadPatch(data);
    $('#cp-btn-play').fadeIn(200);
    $('#cp-btn-play').fadeIn(200);
    }
  });
  
  console.log(patch);
}
