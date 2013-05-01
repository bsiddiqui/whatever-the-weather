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

    var finalJSON = mergeJson({}, data0, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11);

    console.log(JSON.stringify(finalJSON));
};