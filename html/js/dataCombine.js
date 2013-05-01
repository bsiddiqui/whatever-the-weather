window.onload = function() {
    function mergeJson(target) {
        for (var argi = 1; argi < arguments.length; argi++) {
            var source = arguments[argi];
            for (var key in source) {
                if (!(key in target)) {
                    target[key] = [];
                }
                for (var i = 0; i < source[key].length; i++) {
                    target[key].push(source[key][i]);
                }
            }
        }
        return target;
    }

    var finalJSON = mergeJson({}, data, data1);

    console.log(JSON.stringify(finalJSON));
};