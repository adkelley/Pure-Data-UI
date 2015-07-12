$(function() {
  var availableTags = [
    "bang",
    "dac~",
    "osc~"
  ];
  $( "#tags" ).autocomplete({
    source: availableTags,
    select: function(event, ui) {
      $("body").append("Hello World " + ui.item.value);
    }
  });
});

