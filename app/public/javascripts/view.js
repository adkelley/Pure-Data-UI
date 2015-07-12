$(function() {

  addObject = function(name) {
    var id = Math.floor(Math.random() * 20000);
    $("#pdCanvas").append("<div class='object' id=" + id + ' >' + name + " </div>");
  }

  var availableTags = [
    "bang",
    "dac~",
    "osc~"
  ];

  // Listeners
  $( "#tags" ).autocomplete({
    source: availableTags,
    select: function(event, ui) {
      addObject(ui.item.value);
    }
  });
});

