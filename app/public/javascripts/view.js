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
    var pathToFile = 'main.pd';
    $('#nav-patch').removeClass('active');
    $('#nav-demo').addClass('active');
    $('.no-patch').remove();
    $('.alert').remove();
    // $('#pp-btn-patch').remove();
    // $('#pp-btn-demo').add();
    $('#pp-btn-patch').fadeOut();
    $('#pp-btn-demo').fadeIn();
    _loadPatch(pathToFile)
    //Todo: find a way to determine if
    // patch loaded successfully!
    $('#pp-btn-play').fadeIn(200);
    $('#pp-btn-stop').fadeIn(200);
    
  });

  $('#nav-patch a').click(function(e) {
    var pathToFile = 'main.pd';
    $('#nav-patch').addClass('active');
    $('#nav-demo').removeClass('active');
    $('.no-patch').remove();
    $('.alert').remove();
    //_loadPatch(pathToFile)
    //Todo: find a way to determine if
    // patch loaded successfully!
    $('#pp-btn-demo').fadeOut();
    $('#pp-btn-patch').fadeIn();
    // $('#pp-btn-demo').remove();
    // $('#pp-btn-patch').add();
    // Todo: see if a patch is loaded.  If so
    // then don't fade the buttons in.  Keep
    // them visible
    $('#pp-btn-play').fadeIn(200);
    $('#pp-btn-stop').fadeIn(200);
    
  });
});


