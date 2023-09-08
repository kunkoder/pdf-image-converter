var solver = {
    bayes: function (matrix, weight, cost) {
        var manual = '<b>Result</b><br>';
        var result = [];
        for (var i in matrix) {
            manual += matrix[i][0] + ' = ';
            var temp = [];
            for (var j = 1; j < matrix[0].length; j++) {
                manual += '(' + matrix[i][j] + ' * ' + weight[j - 1] + ') + ';
                temp.push(matrix[i][j] * weight[j - 1]);
            }

            var value = temp.reduce(function (a, b) {
                return a + b;
            });
            manual = manual.slice(0, -2);
            manual += '= ' + Math.round(value * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(value * 100000) / 100000
            });
        }
        return [result, manual];
    },
    cpi: function (matrix, weight, cost) {
        var manual = '<b>Transformed</b><br>';
        var transformed = [];
        for (var i in matrix) {
            manual += matrix[i][0] + '<br>';
            transformed.push([]);
            for (var j = 1; j < matrix[0].length; j++) {
                var temp = [];
                for (var k in matrix) {
                    temp.push(matrix[k][j]);
                }
                manual += matrix[i][j] + ' / ' + 'MIN(' + temp + ') * 100' + ' = ';
                var temp_transformed = matrix[i][j] / Math.min.apply(Math, temp) * 100;
                manual += Math.round(temp_transformed * 100000) / 100000 + '<br>';
                transformed[i].push(temp_transformed);
            }
        }

        manual += '<br><b>Result</b><br>';
        var result = [];
        for (var i in transformed) {
            manual += matrix[i][0] + ' = ';
            var temp = [];
            for (var j in transformed[0]) {
                manual += '(' + Math.round(transformed[i][j] * 100000) / 100000 + ' * ' + weight[j] + ') + ';
                temp.push(transformed[i][j] * weight[j]);
            }

            var value = temp.reduce(function (a, b) {
                return a + b;
            });
            manual = manual.slice(0, -2);
            manual += '= ' + Math.round(value * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(value * 100000) / 100000
            });
        }
        return [result, manual];
    },
    mpe: function (matrix, weight, cost) {
        var manual = '<b>Result</b><br>';
        var result = [];
        for (var i in matrix) {
            manual += matrix[i][0] + ' = ';
            var temp = [];
            for (var j = 1; j < matrix[0].length; j++) {
                manual += matrix[i][j] + '<sup>' + weight[j - 1] + '</sup> + ';
                temp.push(Math.pow(matrix[i][j], weight[j - 1]));
            }

            var value = temp.reduce(function (a, b) {
                return a + b;
            });
            manual = manual.slice(0, -2);
            manual += '= ' + Math.round(value * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(value * 100000) / 100000
            });
        }
        return [result, manual];
    },
    saw: function (matrix, weight, cost) {
        var manual = '<b>Normalized</b><br>';
        var normalized = [];
        for (var i in matrix) {
            manual += matrix[i][0] + '<br>';
            normalized.push([]);
            for (var j = 1; j < matrix[0].length; j++) {
                var temp = [];
                for (var k in matrix) {
                    temp.push(matrix[k][j]);
                }
                manual += cost[j - 1] == 'yes' ? 'MIN(' + temp + ') / ' + matrix[i][j] + ' = ' : matrix[i][j] + ' / ' + 'MAX(' + temp + ') = ';
                var temp_normalized = cost[j - 1] == 'yes' ? Math.min.apply(Math, temp) / matrix[i][j] : matrix[i][j] / Math.max.apply(Math, temp);
                manual += Math.round(temp_normalized * 100000) / 100000 + '<br>';
                normalized[i].push(temp_normalized);
            }
        }

        manual += '<br><b>Result</b><br>';
        var result = [];
        for (var i in normalized) {
            manual += matrix[i][0] + ' = ';
            var temp = [];
            for (var j in normalized[0]) {
                manual += '(' + Math.round(normalized[i][j] * 100000) / 100000 + ' * ' + weight[j] + ') + ';
                temp.push(normalized[i][j] * weight[j]);
            }

            var value = temp.reduce(function (a, b) {
                return a + b;
            });
            manual = manual.slice(0, -2);
            manual += '= ' + Math.round(value * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(value * 100000) / 100000
            });
        }
        return [result, manual];
    },
    topsis: function (matrix, weight, cost) {
        var manual = '<b>Weighted Normalized</b><br>';
        var normalized = [],
            weighted = [];
        for (var i in matrix) {
            manual += matrix[i][0] + '<br>';
            normalized.push([]);
            weighted.push([]);
            for (var j = 1; j < matrix[0].length; j++) {
                var temp = [];
                for (var k in matrix) {
                    temp.push(Math.pow(matrix[k][j], 2));
                }
                temp = temp.reduce(function (a, b) {
                    return a + b;
                });
                var temp_normalized = matrix[i][j] / Math.sqrt(temp);
                manual += '(' + matrix[i][j] + ' / &radic;' + temp + ') * ' + weight[j - 1] + ' = ' + Math.round(temp_normalized * weight[j - 1] * 100000) / 100000 + '<br>';
                normalized[i].push(temp_normalized);
                weighted[i].push(temp_normalized * weight[j - 1]);
            }
        }

        var _weighted = weighted[0].map(function (x, i) {
            return weighted.map(function (x) {
                return x[i];
            });
        });

        var min = [],
            max = [];
        for (var i in cost) {
            min.push(cost[i] == 'yes' ? Math.max.apply(Math, _weighted[i]) : Math.min.apply(Math, _weighted[i]));
            max.push(cost[i] == 'yes' ? Math.min.apply(Math, _weighted[i]) : Math.max.apply(Math, _weighted[i]));
        }

        manual += '<br><b>Alternative Positive and Alternative Negative</b><br>'
        var alter_pos = [],
            alter_neg = [];
        for (var i in weighted) {
            manual += matrix[i][0] + '<br>';
            var temp_pos = [],
                temp_neg = [];
            for (var j in weighted[0]) {
                manual += '(' + Math.round(max[j] * 100000) / 100000 + ' - ' + Math.round(weighted[i][j] * 100000) / 100000 + ')<sup>2</sup> = ' + Math.round(Math.pow(max[j] - weighted[i][j], 2) * 100000) / 100000 + '<br>';
                manual += '(' + Math.round(min[j] * 100000) / 100000 + ' - ' + Math.round(weighted[i][j] * 100000) / 100000 + ')<sup>2</sup> = ' + Math.round(Math.pow(min[j] - weighted[i][j], 2) * 100000) / 100000 + '<br>';
                temp_pos.push(Math.pow(max[j] - weighted[i][j], 2));
                temp_neg.push(Math.pow(min[j] - weighted[i][j], 2));
            }
            var sum_temp_pos = temp_pos.reduce(function (a, b) {
                return a + b;
            });
            manual += 'Alternative Positive = &radic;' + Math.round(sum_temp_pos * 100000) / 100000 + ' = ' + Math.round(Math.sqrt(sum_temp_pos) * 100000) / 100000 + '<br>';
            alter_pos.push(Math.sqrt(sum_temp_pos));
            var sum_temp_neg = temp_neg.reduce(function (a, b) {
                return a + b;
            });
            manual += 'Alternative Negative = &radic;' + Math.round(sum_temp_neg * 100000) / 100000 + ' = ' + Math.round(Math.sqrt(sum_temp_neg) * 100000) / 100000 + '<br>';
            alter_neg.push(Math.sqrt(sum_temp_neg));
        }

        manual += '<br><b>Result</b><br>';
        var result = []
        for (var i in alter_pos) {
            manual += matrix[i][0] + ' = ' + Math.round(alter_neg[i] * 100000) / 100000 + ' / (' + Math.round(alter_pos[i] * 100000) / 100000 + ' + ' + Math.round(alter_neg[i] * 100000) / 100000 + ') = ' + Math.round(alter_neg[i] / (alter_pos[i] + alter_neg[i]) * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(alter_neg[i] / (alter_pos[i] + alter_neg[i]) * 100000) / 100000
            });
        }
        return [result, manual];
    },
    wp: function (matrix, weight, cost) {
        var manual = '<b>Vector</b><br>';
        var vector = [];
        for (var i in matrix) {
            manual += matrix[i][0] + '<br>';
            var temp = [];
            for (var j = 1; j < matrix[0].length; j++) {
                manual += cost[j - 1] == 'yes' ? matrix[i][j] + '<sup>-' + weight[j - 1] + '</sup> + ' : matrix[i][j] + '<sup>' + weight[j - 1] + '</sup> + ';
                temp.push(cost[j - 1] == 'yes' ? Math.pow(matrix[i][j], -weight[j - 1]) : Math.pow(matrix[i][j], weight[j - 1]));
            }
            var sum_temp = temp.reduce(function (a, b) {
                return a * b;
            });
            manual = manual.slice(0, -2);
            manual += '= ' + Math.round(sum_temp * 100000) / 100000 + '<br>';
            vector.push(sum_temp);
        }

        manual += '<br><b>Result</b><br>';
        var result = [];
        var sum_vector = vector.reduce(function (a, b) {
            return a + b;
        });
        for (var i in vector) {
            manual += matrix[i][0] + ' = ' + Math.round(vector[i] * 100000) / 100000 + ' / ' + Math.round(sum_vector * 100000) / 100000 + ' = ' + Math.round(vector[i] / sum_vector * 100000) / 100000 + '<br>';
            result.push({
                "alternative": matrix[i][0],
                "value": Math.round(vector[i] / sum_vector * 100000) / 100000
            });
        }
        return [result, manual];
    }
}