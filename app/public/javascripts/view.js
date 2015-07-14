$(function() {

  var autoCompleteWidget = function(id) {
    return "<div class='ui-widget empty-node' id=" + id + " >\n" +
           // "<label class='tagLabel' for='tags'></label>" +
           '<input id=' + id + '-tags>\n</div>'
  }
  
  var canvasID = function() {
    return '#pdCanvas';
  }


  var addEmptyNode = function(x, y) {
    var id = createID();
    var availableTags = [
      "bang",
      "dac~",
      "osc~"
    ];

    $(canvasID()).append(autoCompleteWidget(id));
    $('#'+id+'-tags').css('top', y);
    $('#'+id+'-tags').css('left', x);
    $( '#'+id+'-tags').autocomplete({
      source: availableTags,
      select: function(event, ui) {
        // remove the helper span
        $('.ui-helper-hidden-accessible').remove();
        alert('Its working');
      }
    });

    // $(canvasID()).append("<div class='empty-node' id=" + id + ' >' + 'dbl click' + ' </div>');
    // $('#'+id).css("top", pos.y);
    // $('#'+id).css("left", pos.x);
    return id;
  }


    // $( "#tags" ).autocomplete({
    //   source: availableTags,
    //   select: function(event, ui) {
    //     addObject(ui.item.value);
    //   }
    // });

  // Listeners

  // var newPatch = function () {
  //   // Draw an object box
  //   var id = addEmptyNode(25, 25);
  // }

  // Make error message visible in a Modal header by removing
  // hidden from class
  var $showHeaderError = function (id) {
    $('#'+id+'header').removeClass('visible');
    $('#'+id+'header').addClass('hidden');
    $('#'+id+'header-error').removeClass('hidden');
    $('#'+id+'header-error').addClass('visible');
  }

  // Remove Play/Stop until Patch Data loaded by user
  $('#cp-btn-play').fadeOut();
  $('#cp-btn-stop').fadeOut();
  
  // Init Control Panel Listeners
  $('#cp-btn-play').click(function () {
    $('#cp-btn-stop').removeClass('active');
    $('#cp-btn-play').addClass('active');
    _playPatch();
  });

  $('#cp-btn-stop').click(function () {
    $('#cp-btn-play').removeClass('active');
    $('#cp-btn-stop').addClass('active');
    _stopPatch();
  });

  $('#cp-ddm-patch-import a').click(function(e) {
    //e.preventDefault ();
    pathToFile = _importPatch();
    if (pathToFile) {
      if (_loadPatch(pathToFile)) {
        $('#cp-btn-play').fadeIn(200);
        $('#cp-btn-stop').fadeIn(200);
      } else {
        // Message that the demo failed to load
        console.log("Something went wrong!");
      }
    } else {
      console.log("Something went wrong!");
    }
  });

  $('#nav-demo a').click(function(e) {
    var pathToFile = 'main.pd';
    $('#nav-demo').addClass('active');
    if (_loadPatch(pathToFile)) {
      $('#cp-btn-play').fadeIn(200);
      $('#cp-btn-stop').fadeIn(200);
    } else {
      // Message that the demo failed to load
      console.log("demo failed!");
    }
  })
});


