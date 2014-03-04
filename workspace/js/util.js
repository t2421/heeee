function sortArray(array, key) {
	
	var newArray = [].concat(array);
    newArray.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (x > y) {
            return 1;
        }
        if (x < y) {
            return -1;
        }
        return 0;
    });
    return newArray;
};

function sortArray2(array, key) {
	var newArray = [].concat(array);
    newArray.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (x < y) {
            return 1;
        }
        if (x > y) {
            return -1;
        }
        return 0;
    });
    return newArray;
};

function shuffle(array) {
    var i = array.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = array[--i];
        array[i] = array[j];
        array[j] = t;
    }
    return array;
}