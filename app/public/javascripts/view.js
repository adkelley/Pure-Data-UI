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

  var newPatch = function () {
    // Draw an object box
    var id = addEmptyNode(25, 25);
  }


  // Init Control Panel Listeners
  $('#cp-btn-play').click(function () {
    if (_playPatch) {
      $('#cp-btn-stop').removeClass('active');
      $('#cp-btn-play').addClass('active');
    }
  });

  $('#cp-btn-stop').click(function () {
    if (_stopPatch()) {
      $('#cp-btn-play').removeClass('active');
      $('#cp-btn-stop').addClass('active');
    }
  });

  $('#cp-ddm-patch-import a').click(function(e) {
    //e.preventDefault ();
    _importPatch();
  });

  $('#nav-demo a').click(function(e) {
    $('#nav-demo').addClass('active');
    $('#cp-btn-play').fadeOut();
    $('#cp-btn-stop').fadeOut();
    _loadDemoPatch();
  })
});


