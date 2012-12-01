$(document).ready(function(){
	var movies = new Array('Необратимость', 'Как я встретил вашу маму', 'Терминатор');
	var movie = movies[_.random(movies.length-1)].toLowerCase();
	var struct = new Structure(movie);
	var mistakes = 0;
	var mistakesLimit = 3;

	for(var i=0;i<struct.count; i++){
		$(".word").append("<span id='nind' class='letter'></span>".replace('ind', i));
	}
	$(document).keypress(function(e){
		var encoded = encodeSymbol(e.which);
		var symbol = struct.getSymbol(encoded);
		if(symbol){
			if(!symbol.inUse){
				_.each(symbol.indexes, function(elem){
					$("#nind".replace('ind', elem)).append(encoded);
				});
				if(symbol.done){
					$(".mistakes").empty();
					$(".mistakes").append("Правильно");
				}
			}
		} else {
			mistakes++;
			if(mistakes>mistakesLimit){
				$(".word").empty();
				$(".mistakes").empty();
				$(".word").append("Игра окончена");
			} else{
				$(".mistakes").html('Ошибок: m'.replace('m', mistakes));
			}
		}
	});
});