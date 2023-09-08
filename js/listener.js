document.querySelector('#add-row').addEventListener('click', function (e) {
    e.preventDefault();

    var alternative = document.querySelectorAll('#in-table tbody tr');
    var criteria = alternative[0].querySelectorAll('td');

    var noTd = document.createElement('td');
    noTd.setAttribute('class', 'text-center');
    noTd.innerHTML = alternative.length - 1;

    var alternativeInput = document.createElement('input');
    alternativeInput.setAttribute('type', 'text');
    alternativeInput.setAttribute('name', 'A' + (alternative.length - 1));
    alternativeInput.setAttribute('value', 'A' + (alternative.length - 1));
    alternativeInput.setAttribute('class', 'form-control');
    alternativeInput.required = true;

    var alternativeDiv = document.createElement('div');
    alternativeDiv.setAttribute('class', 'form-group');
    alternativeDiv.appendChild(alternativeInput);

    var alternativeTd = document.createElement('td');
    alternativeTd.appendChild(alternativeDiv);

    var tr = document.createElement('tr');
    tr.appendChild(noTd);
    tr.appendChild(alternativeTd);

    for (var i = 1; i < criteria.length - 1; i++) {
        var criteriaInput = document.createElement('input');
        criteriaInput.setAttribute('type', 'text');
        criteriaInput.setAttribute('name', 'R' + (alternative.length - 1) + 'C' + i);
        criteriaInput.setAttribute('value', '0');
        criteriaInput.setAttribute('class', 'form-control');
        criteriaInput.required = true;

        var criteriaDiv = document.createElement('div');
        criteriaDiv.setAttribute('class', 'form-group');
        criteriaDiv.appendChild(criteriaInput);

        var criteriaTd = document.createElement('td');
        criteriaTd.appendChild(criteriaDiv);

        tr.appendChild(criteriaTd);
    }

    var tbody = document.querySelector('#in-table tbody');
    tbody.insertBefore(tr, alternative[alternative.length - 2]);
});

document.querySelector('#add-col').addEventListener('click', function (e) {
    e.preventDefault();

    var alternative = document.querySelectorAll('#in-table tbody tr');
    var criteria = alternative[0].querySelectorAll('td');

    var costTh = document.createElement('th');
    costTh.setAttribute('style', 'min-width: 150px');
    costTh.innerHTML = 'C' + (criteria.length - 1);

    var tr = document.querySelector('#in-table thead tr');
    tr.appendChild(costTh);

    for (var i = 0; i < alternative.length - 2; i++) {
        var criteriaInput = document.createElement('input');
        criteriaInput.setAttribute('type', 'text');
        criteriaInput.setAttribute('name', 'R' + (i + 1) + 'C' + (criteria.length - 1));
        criteriaInput.setAttribute('value', '0');
        criteriaInput.setAttribute('class', 'form-control');
        criteriaInput.required = true;

        var criteriaDiv = document.createElement('div');
        criteriaDiv.setAttribute('class', 'form-group');
        criteriaDiv.appendChild(criteriaInput);

        var criteriaTd = document.createElement('td');
        criteriaTd.appendChild(criteriaDiv);

        alternative[i].appendChild(criteriaTd);
    }

    var weightInput = document.createElement('input');
    weightInput.setAttribute('type', 'text');
    weightInput.setAttribute('name', 'W' + (criteria.length - 1));
    weightInput.setAttribute('value', '0');
    weightInput.setAttribute('class', 'form-control');
    weightInput.required = true;

    var weightDiv = document.createElement('div');
    weightDiv.setAttribute('class', 'form-group');
    weightDiv.appendChild(weightInput);

    var td = document.createElement('td');
    td.appendChild(weightDiv);

    alternative[alternative.length - 2].appendChild(td);

    var costInput = document.createElement('input');
    costInput.setAttribute('type', 'checkbox');
    costInput.setAttribute('name', 'C' + (criteria.length - 1));
    costInput.setAttribute('class', 'switch');
    costInput.setAttribute('id', 'C' + (criteria.length - 1));

    var label = document.createElement('label');
    label.setAttribute('class', 'switch-label');
    label.setAttribute('for', 'C' + (criteria.length - 1));
    label.appendChild(costInput);

    var costDiv = document.createElement('div');
    costDiv.setAttribute('class', 'text-center pb-1 mt-1');
    costDiv.appendChild(costInput);
    costDiv.appendChild(label);

    var th = document.createElement('th');
    th.appendChild(costDiv);

    alternative[alternative.length - 1].appendChild(th);
});

document.querySelector('#del-row').addEventListener('click', function (e) {
    e.preventDefault();

    var alternative = document.querySelectorAll('#in-table tbody tr');
    if (alternative.length > 4) {
        alternative[alternative.length - 3].remove();
    }
});

document.querySelector('#del-col').addEventListener('click', function (e) {
    e.preventDefault();

    var criteria = document.querySelectorAll('#in-table thead tr th');
    if (criteria.length > 4) {
        var tr = document.querySelector('#in-table thead tr');
        tr.lastChild.remove();

        tr = document.querySelectorAll('#in-table tbody tr');
        for (var i = 0; i < tr.length; i++) {
            tr[i].lastChild.remove();
        }
    }
});

var form = document.querySelector('#in-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    var checkbox = form.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].setAttribute('value', checkbox[i].checked == true ? 'yes' : 'no');
    }

    var data = []
    for (var i = 0; i < form.elements.length - 1; i++) {
        data.push(form.elements.item(i).value)
    }

    var alternatif = document.querySelectorAll('#in-table tbody tr').length - 2;
    var criteria = document.querySelectorAll('#in-table thead tr th').length - 2;
    var method = data[0];
    var weight = data.slice(-criteria * 2 - 1, -criteria - 1);
    var cost = data.slice(-criteria - 1, -1);

    var temp = data.slice(1, -criteria * 2 - 1)
    var matrix = [];
    for (var i = 0; i < alternatif; i++) {
        matrix.push(temp.slice(criteria * i + i, criteria * (i + 1) + i + 1));
    }

    var manual = '',
        result;

    if (data.slice(-1) == 'yes') {
        manual += '<b>Weight Normalized</b><br>';
        var sum = weight.reduce(function (a, b) {
            return (+a) + (+b);
        });
        for (var i in weight) {
            manual += 'W' + ((+i) + 1) + ' = ' + weight[i] + ' / ' + sum + ' = ';
            weight[i] = Math.round(weight[i] / sum * 100000) / 100000;
            manual += weight[i] + '<br>';
        }
        manual += '<br>';
    }

    switch (method) {
        case 'BAYES':
            result = solver.bayes(matrix, weight, cost)[0];
            manual += solver.bayes(matrix, weight, cost)[1];
            break;

        case 'CPI':
            result = solver.cpi(matrix, weight, cost)[0];
            manual += solver.cpi(matrix, weight, cost)[1];
            break;

        case 'MPE':
            result = solver.mpe(matrix, weight, cost)[0];
            manual += solver.mpe(matrix, weight, cost)[1];
            break;

        case 'SAW':
            result = solver.saw(matrix, weight, cost)[0];
            manual += solver.saw(matrix, weight, cost)[1];
            break;

        case 'TOPSIS':
            result = solver.topsis(matrix, weight, cost)[0];
            manual += solver.topsis(matrix, weight, cost)[1];
            break;

        case 'WP':
            result = solver.wp(matrix, weight, cost)[0];
            manual += solver.wp(matrix, weight, cost)[1];
            break;

        default:
            break;
    }

    result.sort(function (a, b) {
        return b.value - a.value;
    });

    for (var i in result) {
        result[i].rank = (+i) + 1;
    }

    var tbody = document.createElement('tbody');
    for (var i in result) {
        var rankTd = document.createElement('td');
        rankTd.setAttribute('class', 'text-center')
        rankTd.innerHTML = result[i].rank;

        var alternativeTd = document.createElement('td');
        alternativeTd.innerHTML = result[i].alternative;

        var valueTd = document.createElement('td');
        valueTd.innerHTML = result[i].value;

        var tr = document.createElement('tr');
        tr.appendChild(rankTd);
        tr.appendChild(alternativeTd);
        tr.appendChild(valueTd);

        tbody.appendChild(tr);
    }

    document.querySelector('.collapse-rank').className = 'collapse show collapse-rank';
    document.querySelector('.collapse-manual').className = 'collapse show collapse-manual';
    document.querySelector('#out-table tbody').replaceWith(tbody);
    document.querySelector('#manual').innerHTML = manual;
});

// if ('serviceWorker' in navigator) {
//     addEventListener('load', function () {
//         navigator.serviceWorker.register('sw.js').then(function (r) {
//             console.log('ServiceWorker registration successfull with scope: ', r.scope);
//         }, function (e) {
//             console.log('ServiceWorker registration failed: ', e);
//         });
//     });
// }