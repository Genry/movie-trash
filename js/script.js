$(document).ready(function(){
    var game;
    var movies = new Array('Необратимость', 'Как я встретил вашу маму', 'Терминатор');
    var movie = getMovie(movies);

    function getMovie(movieList){
        return movieList[_.random(movieList.length-1)].toLowerCase();
    }

    // main class
    var Game = function(movie){
        this.MISTAKES_LIMIT = 3;
        this.structure = new Structure(movie);
        this.mistakes = 0;
        this.count = this.structure.count;
        this.getMistakesLimit = function(){
            return this.MISTAKES_LIMIT;
        };
        this.getSymbol = function(s){
            return this.structure.getSymbol(s);
        };
        this.incMistake = function(){
            console.log(_.random(5));
            this.mistakes++;
        };
        this.getMistakes = function(){
            return this.mistakes;
        };
    };

    function initGame(){
        game = new Game(movie);
        $(".word").empty();
        $(".mistakes").empty();
        $(".restart-button").css('display', 'none');

        for(var i=0, j=game.count; i<j; i++){
            $(".word").append("<span id='nind' class='letter'></span>".replace('ind', i));
        }

        for(var i=0, j=game.getMistakesLimit(); i<j; i++){
            $(".mistakes").append("<span id='mistake_ind' class='mistake'></span>".replace('ind', i));
        }
    }

    function fillMistakeMark(index){
        $(".mistake:eq(index)".replace('index', index)).css('background-color', 'red');
    }

    $(document).keypress(function(e){
        var encoded = encodeSymbol(e.which);
        var symbol = game.getSymbol(encoded);
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
            game.incMistake();
            var mistakes = game.getMistakes();
            if(mistakes>=game.getMistakesLimit()){
                $(".word").empty();
                $(".word").append("Игра окончена");
                $(".restart-button").css('display', 'block');
                fillMistakeMark(mistakes-1);;
            } else{
                fillMistakeMark(mistakes-1);
            }
        }
    });

    initGame();

    $(".restart-button").on("click", function(){
        initGame();
    });
});