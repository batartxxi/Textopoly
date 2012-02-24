$(document).ready(function() {
	$.getJSON('data/section.json', function(data, textStatus, jqXHR) {
		var minX = data["minX"];
		var minY = data["minY"];
		var stepX = 64;
		var stepY = 48;
		$.each(data["texts"], function(index, aValue) {
			var aX = (aValue["x"] - minX) * stepX;
			var aY = (aValue["y"] - minY) * stepY;
			var newTxt = $(document.createElement("div")).addClass("msg");
			var aWidth = stepX * 2;
			var aHeight = stepY * 2;
			if((aValue["s"] == "l") || (aValue["s"] == "f"))
				aWidth *= 2;
			if((aValue["s"] == "t") || (aValue["s"] == "f"))
				aHeight *= 2;
			newTxt.css({
				left : aX,
				top : aY,
				width : aWidth,
				height : aHeight
			});
			if(aValue["t"])
				newTxt.text(aValue["t"]);
			else if(aValue["i"]) {
				var newImg = $(document.createElement("img")).addClass("msg");
				newImg.attr({src:aValue["i"]});
				newTxt.append(newImg);
			}

			$("body").append(newTxt);
		});
	});
});