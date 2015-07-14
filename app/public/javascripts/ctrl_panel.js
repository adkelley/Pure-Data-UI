var _playPatch = function() {
  Pd.start();
};

var _stopPatch = function () {
  Pd.stop();
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

var _loadPatch = function (pathToFile) {
  var patch;
  var result = $.get(pathToFile, function(mainStr) {
    patch = Pd.loadPatch(mainStr);
  })
    .done(function() {
      if (patch) {
        console.log("Patch successfully loaded")
      } else {
        result = false;
      }
    })
    .fail(function() {
      console.log("Something went wrong with file load")
    });
  
  // Give a little time for patch to initialize
  // before returning
  return (window.setTimeout(
    function() {
      return patch;
    }, 200));
}
