$(document).ready(function(){
    var MISTAKES_LIMIT = 3;

	var movies = new Array('Необратимость', 'Как я встретил вашу маму', 'Терминатор');
	var movie = getMovie(movies);
	var struct = new Structure(movie);
	var mistakes = 0;

	for(var i=0, j=struct.count; i<j; i++){
		$(".word").append("<span id='nind' class='letter'></span>".replace('ind', i));
	}

    for(var i=0;i<MISTAKES_LIMIT; i++){
        $(".mistakes").append("<span id='mistake_ind' class='mistake'></span>".replace('ind', i));
    }

    function getMovie(movieList){
        return movieList[_.random(movieList.length-1)].toLowerCase();
    }

    $(".restart-button").on("click", function(){
        console.log(this);
    });

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
			if(mistakes>MISTAKES_LIMIT){
				$(".word").empty();
				$(".mistakes").empty();
				$(".word").append("Игра окончена");
                $(".restart-button").css('display', 'block')
			} else{
				$(".mistake:eq(index)".replace('index', mistakes-1)).css('background-color', 'red');
}
}
});

});