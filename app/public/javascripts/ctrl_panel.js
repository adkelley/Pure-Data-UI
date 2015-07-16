var _playPatch = function() {
  Pd.start();
};

var _stopPatch = function () {
  Pd.stop();
};

// var uploadForm = "<form id='uploadForm' enctype='multipart/form-data'" +
//       "method='post' action='/api/import-patch'>" +
//       "<input type='file' name='patch' />" +
//       "<button type='submit' form='uploadForm'>Upload</button></form>";

// var _importPatch = function () {
//   $(uploadForm).dialog({
//     autoOpen: true,
//     height: 300,
//     width: 350,
//     modal: true,
//     open: function() {
//       // On open, hide the original submit button
//       $( this ).find( "[type=submit]" ).hide();
//     },
//     buttons: [
//       {
//         text: "Upload",
//         click: $.noop,
//         type: "submit",
//         form: "uploadForm" // <-- Make the association
//       },
//       {
//         text: "Close",
//         click: function() {
//           $( this ).dialog( "close" );
//         }
//       }
//     ],
//     title: "Upload Patch"
//   });
// }

var _loadPatch = function (pathToFile) {
  var patch, patchData;

  $.get(pathToFile, function(mainStr) {
    patch = Pd.loadPatch(mainStr);
    patchData = mainStr;
  })
    .done(function() {
      if (patch) {
        result = true;
        $('#pdCanvas').html(pdfu.renderSvg(pdfu.parse(patchData), {svgFile: false, ratio: 1.5}))
        console.log("Patch successfully loaded")
      } else {
        console.log("Patch did not load");
      }
    })
    .fail(function() {
      console.log("Something went wrong with loading the patch");
    });
}
