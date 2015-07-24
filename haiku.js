var fs = require('fs');


fs.readFile('cmudict.txt', function(err, data){
	if(err) {
		return console.log(err);
	}

	function countSyl(arr) {
		var count = 0;
		if (arr[1] !== undefined) {
			arr[1].match(/\d/g) === null ? count = 0 : count = line_split[1].match(/\d/g).length 
		}
		return count;
	}
	function storeData(syllables, word) {
		if (numSyllables[syllables] === undefined) numSyllables[syllables] = []; 
		numSyllables[syllables].push(word);
	}
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}
	function makeOneWordLineHaiku() {
		console.log(randomWordNumSyl(5))
		console.log(randomWordNumSyl(7))
		console.log(randomWordNumSyl(5))
	}
	function randomWordNumSyl(num) {
		return numSyllables[num][getRandomInt(0, numSyllables[num].length)]
	}
	function sum(a,b) {
    	return a+b;
	}
	function genHaikuArray() {
    	var array = [[],[],[]];
    	
    	// FISHER-YATES (AKA KNUTH) SHUFFLE FUNCTION
    	// See: https://github.com/coolaj86/knuth-shuffle for more info
		function shuffle(array) {
	      var currentIndex = array.length, temporaryValue, randomIndex ;
	      // While there remain elements to shuffle...
	      while (0 !== currentIndex) {
	        // Pick a remaining element...
	        randomIndex = Math.floor(Math.random() * currentIndex);
	        currentIndex -= 1;
	        // And swap it with the current element.
	        temporaryValue = array[currentIndex];
	        array[currentIndex] = array[randomIndex];
	        array[randomIndex] = temporaryValue;
	      }
	      return array;
		}
    
		function getHaikuLine(line, syllables){
		   	var numused = 0;
		    do {
		        array[line].push(getRandomInt(1,(syllables-numused)));
		        numused = array[line].reduce(sum);
		    } while(numused < syllables)
		    shuffle(array[line]);
		}
    
	    getHaikuLine(0,5);
	    getHaikuLine(1,7);
	    getHaikuLine(2,5);

	    return array;
	}

	function makeRandomHaiku(arrTwoD) {
	    var result = [];
	    var str = "";
	    var answer = [];
	    for (var i=0; i<arrTwoD.length; i++) {
	        for(var j=0; j<arrTwoD[i].length; j++) {
	            result.push(randomWordNumSyl(arrTwoD[i][j]));
	        }
	        str = result.join(" ")
	        answer.push(str);
	        result = [];

	    }
	
	    return answer.join("\n");
	}

	var numSyllables = [];
	var syllables;
	var lines = data.toString().split("\n");

	lines.forEach(function (line){
		line_split = line.split("  ");
		syllables = countSyl(line_split);
		storeData(syllables,line_split[0]);
		//console.log("The word " + line_split[0] + " has this phoneme layout: " + line_split[1] + " and " + syllables + " syllables.");
			
	});

	var haikuarray = [];
	haikuarray = genHaikuArray();
	console.log(makeRandomHaiku(haikuarray));

});




