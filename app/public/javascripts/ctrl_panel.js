var _playPatch = function() {
  return (isPatchLoaded()) ? true : false;
};

var _stopPatch = function () {
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
  
  return true;
}
