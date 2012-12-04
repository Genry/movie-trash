/*
    the movie class
 */
function Structure(movie){
    this.count = movie.length;
    this.letters = {};
    this.usedCount = 0;
    this.isDone = function(){
        return this.usedCount == _.size(this.letters);
    };
    var that = this;
    _.each(movie.split(''), function(el, index){
        if(that.letters.hasOwnProperty(el)){
            that.letters[el].indexes.push(index);
        } else {
            that.letters[el] = {'inUse': false, 'indexes': [index]};
        }
    });

    this.getSymbol = function(s){
        if(this.letters[s]){
            if(!this.letters[s].inUse){
                this.letters[s].inUse = true;
                this.usedCount++;
                return {
                    'indexes': this.letters[s].indexes,
                    'inUse': false,
                    'done': this.isDone()
                };
            }
            else{
                return {
                    'indexes': this.letters[s].indexes,
                    'inUse': true,
                    'done': this.isDone()
                };
            }
        }
    }
}