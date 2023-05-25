$(document).ready(function() {
    var mapContainer = $("#map");
    var isDragging = false;
    var startClientX, startClientY;
    var startOffsetLeft, startOffsetTop;
    
    mapContainer.css('left', ($("#lowermap").width() - mapContainer.width())/2 + "px");
    mapContainer.css('top', ($("#lowermap").height() - mapContainer.height())/2 + "px");

    mapContainer.on("mousedown", function(event) {
      isDragging = true;
      startClientX = event.clientX;
      startClientY = event.clientY;
      startOffsetLeft = parseInt(mapContainer.css("left"), 10);
      startOffsetTop = parseInt(mapContainer.css("top"), 10);
      mapContainer.css("cursor", "grabbing");
    });
  
    $(document).on("mousemove", function(event) {
      if (!isDragging) return;
  
      var deltaX = event.clientX - startClientX;
      var deltaY = event.clientY - startClientY;
      
      var newLeft = startOffsetLeft + deltaX;
      var newTop = startOffsetTop + deltaY;
  
      // Ograniczenie przesunięcia do wartości większych od 0 i mniejszych od wymiarów kontenera
       var containerWidth = -($("#lowermap").width() - mapContainer.width());
       var containerHeight = -($("#lowermap").height() - mapContainer.height());
       
      if (newLeft > 0) {
        newLeft = 0;
      } else if (newLeft < -containerWidth) {
        newLeft = -containerWidth;
      }
      if (newTop > 0) {
        newTop = 0;
      } else if (newTop < -containerHeight) {
        newTop = -containerHeight;
      }
  
      mapContainer.css({
        left: newLeft + "px",
        top: newTop + "px"
      });
    });
  
    $(document).on("mouseup", function() {
      if (isDragging) {
        isDragging = false;
        mapContainer.css("cursor", "grab");
      }
    });
  });
  