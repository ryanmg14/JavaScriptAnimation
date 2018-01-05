//Fuction to get random color
function getRandomColor(){
	var letters= "0123456789abcdef";
	var result = "#";

	for(var i=0; i<6; i++) {
		result += letters.charAt(parseInt(Math.random() * letters.length))
	}

	return result;
}

//Function to make 50 circles
function makeCircles() {

	for (var i = 0; i < 50; i++)
	{

		var div = $("<div class='circle'> </div>")
		var posx = (Math.random() * ($("#box").width() - 50)).toFixed();
		var posy = (Math.random() * ($("#box").height() - 50)).toFixed();
		var colr = getRandomColor();

		$(div).css({
			"left":posx+"px",
			"top":posy+"px",
			"background-color":colr
		});

		$("#box").append(div);

	}

}

//Function to make circles bounce randomly in 4 different directions
function animationFunc (direction) {

	var maxPosx = ($("#box").width() - 50).toFixed();
	var maxPosy = ($("#box").height() - 50).toFixed();

	var i = 0;
	$('.circle').each(function(){

		var thisX = parseInt($(this).css('left'), 10);
		var thisY = parseInt($(this).css('top'), 10);
		var colr = getRandomColor();
		var bordColr = getRandomColor();


		//Direction 1 SE
		if (direction[i] <= 1)
		{
			if((thisX < maxPosx) & (thisY < maxPosy))
			{
				thisX++;
				thisY++;
				$(this).css({
				"left":thisX+"px",
				"top":thisY+"px",
				});
			}
			else if ((thisX <= maxPosx) & (thisY < maxPosy) & thisX > 0 & thisY > 0)
			{
			direction[i] = 4;
			$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}
			else
			{
			direction[i] = 2;
			$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}
		}

		//Direction 2 NE
		else if (direction[i] <= 2)
		{
			if((thisX < maxPosx) & thisY > 0)
			{
				thisX++;
				thisY--;
				$(this).css({
				"left":thisX+"px",
				"top":thisY+"px",
				});
			}

			else if(thisY <= 0)
			{
				direction[i] = 1;
				$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}

			else
			{
				direction[i] = 3;
				$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}
		}

		//Direction 3 NW
		else if (direction[i] <= 3)
		{
			if((thisX <= maxPosx) & (thisY <= maxPosy) & thisX > 0 & thisY > 0)
			{
				thisX--;
				thisY--;
				$(this).css({
				"left":thisX+"px",
				"top":thisY+"px",
				});
			}
			else if (thisX <= 0)
			{
				direction[i] = 2;
				$(this).css ({
					"background-color":colr,
					"border-color":bordColr
				});
			}
			else
			{
			direction[i] = 4;
			$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}
		}

		//Direction 4 SW
		else if (direction[i] <= 4)
		{
			if((thisX <= maxPosx) & (thisY < maxPosy) & (thisX > 0) & (thisY >= 0))
			{
				thisX--;
				thisY++;
				$(this).css({
				"left":thisX+"px",
				"top":thisY+"px",
				});
			}
			else if(thisY >= maxPosy)
			{
				direction[i] = 3;
				$(this).css ({
					"background-color":colr,
					"border-color":bordColr
				});
			}
			else
			{
			direction[i] = 1;
			$(this).css ({
				"background-color":colr,
				"border-color":bordColr
			});
			}
		}
		i++;
	});
}


$(document).ready(function() {

	//Make the 50 circles
	makeCircles();

	//Global variables for directions
	var direction = [];
	var circNum = $('.circle').length;

	//Function for add circle button
	var addCirc = $("#addCirc");
	(addCirc).click(function () {

		var div = $("<div class='circle'> </div>")
		var posx = (Math.random() * ($("#box").width() - 50)).toFixed();
		var posy = (Math.random() * ($("#box").height() - 50)).toFixed();
		var colr = getRandomColor();

			$(div).css({
				"left":posx+"px",
				"top":posy+"px",
				"background-color":colr
			});

		$("#box").append(div);
		circNum++;
		direction[circNum] = Math.random() * 4;

		});

	//Function for Change Color function
	var changeColr = $("#changeColor");
	(changeColr).click(function () {

		var i = 0;
		$(".circle").each(function(i) {
			colr = getRandomColor();
			$(this).css ({
				"background-color":colr
			});
			i++;
		});
	});

	//Function to reset the circles
	var myNode = $(".circle");

	$("#reset").click(function () {

		var i = 0;
		$(".circle").each(function(i) {

			$(this).remove();
			i++;
		});


		makeCircles();
	});

	//Function to bring circle to forefront when clicked on
	$('#box').on('click', '.circle', function() {
		var topZ = 0;
		$('.circle').each(function(){
			  var thisZ = parseInt($(this).css('z-index'), 10);

			  if (thisZ > topZ){
				topZ = thisZ;
			  }
		});
		$(this).css({"z-index":topZ+1});

	});

	//Function to remove circle when double clicked
	$('#box').on('dblclick', '.circle', function() {

		$(this).remove();
	});

//Get an array of random directions for the animation function
	for (var i = 0; i <= circNum; i++)
	{
		direction[i] = Math.random() * 4;
	}

	//Use set Interval to trigger Animation Function
	var k = 0;
	var intervalClr;
	var animate = $("#animate");
	(animate).click(function () {

	//First click starts animation, next stops it
	if(k%2 == 0)
	{
		var maxPosx = ($("#box").width() - 50).toFixed();
		var maxPosy = ($("#box").height() - 50).toFixed();
		var colr = getRandomColor();

		intervalClr = setInterval(function(){ animationFunc(direction) }, 50);
		k++;
	}
	else
	{
		clearInterval(intervalClr);
		k++;
	}


	});

});
