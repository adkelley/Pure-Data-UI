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


  $(document).ready(function() {
    var id = newPatch();
    
    // Listen for dblclick on the box
    $('body').dblclick(function(e){
      addEmptyNode(e.clientX, e.clientY+80);
    });

  });
  
});

