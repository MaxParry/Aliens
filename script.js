function createCell(content, celltype, label){
    if (celltype == 'h'){
        var celltag = 'th';
    } else if (celltype == 'd'){
        var celltag = 'td';
    }

    var thiscell = document.createElement(celltag);
    thiscell.innerText = content;

    if ((label == 'col') || (label == 'row')) {

        thiscell.setAttribute("scope", label)
        
    }

    return thiscell;
}

function renderRows(towhat, _array){

    towhat.innerHTML = '';

    var rowhead = document.createElement('tr')
    var dateHead = createCell('DateTime', 'h', 'col')
    var cityHead = createCell('City', 'h', 'col')
    var stateHead = createCell('State', 'h', 'col')
    var countryHead = createCell('Country', 'h', 'col')
    var shapeHead = createCell('Shape', 'h', 'col')
    var durHead = createCell('Duration (min)', 'h', 'col')
    var comHead = createCell('Comments', 'h', 'col')

    rowhead.appendChild(dateHead);
    rowhead.appendChild(cityHead);
    rowhead.appendChild(stateHead);
    rowhead.appendChild(countryHead);
    rowhead.appendChild(shapeHead);
    rowhead.appendChild(durHead);
    rowhead.appendChild(comHead);

    towhat.appendChild(rowhead);

    //var newrow = document.createElement('tr');

    for (var i=0; i < _array.length; i++){

    var newrow = document.createElement('tr');
    
    var _tablehead = createCell(i + 1, 'h', 'row')
    //var _tablehead = _tablehead.setAttribute("scope", "row")
    var _datetime = createCell(_array[i].datetime, 'd');
    var _city = createCell(_array[i].city, 'd');
    var _state = createCell(_array[i].state, 'd');
    var _country = createCell(_array[i].country, 'd');
    var _shape = createCell(_array[i].shape, 'd');
    var _duration = createCell(_array[i].durationMinutes, 'd');
    var _comments = createCell(_array[i].comments, 'd');
    
    newrow.appendChild(_tablehead)
    newrow.appendChild(_datetime);
    newrow.appendChild(_city);
    newrow.appendChild(_state);
    newrow.appendChild(_country);
    newrow.appendChild(_shape);
    newrow.appendChild(_duration);
    newrow.appendChild(_comments);

    towhat.appendChild(newrow);
    }
}

$thetable = document.querySelector('.thetable');

renderRows($thetable, dataSet);

var $submit = document.querySelector('#thebutton');
$submit.addEventListener('click', handleSubmit);

function handleSubmit(){
    event.preventDefault();
    var $textfield = document.querySelector('#thefield');
    console.log($textfield.value);
    var extracted = $textfield.value;
    $textfield.value = '';

// if selection is such and such, grab value, parse it, and set column variable

    var result = parseInputBasedOnColumn(extracted)
    var parsedextracted = result.parsed;
    var column = result.column;

    var newarr = searchArray(parsedextracted, column);
    renderRows($thetable, newarr);

}

function searchArray(searchterm, column){
    returnarr = []
    for (var i=0; i < dataSet.length; i++){
        if (String(dataSet[i][column]).includes(searchterm)){
            returnarr.push(dataSet[i]);
        }
    }
    return returnarr;
}

function parseInputBasedOnColumn(inputtext){
    var searchtype = document.querySelector('#searchdropdown').value;
    if (searchtype == 'datetime') {
        var intermediate = inputtext;
        
        var next1 = intermediate.split('/')
        var deststr = ''
        for (var i=0; i < next1.length; i++){
            if (next1[i][0] == 0){
                var cleanedelement = next1[i][1];
                deststr += cleanedelement;
            } else {
                deststr += next1[i];
            }
            deststr += '/';
        }
        var ready = deststr.slice(0,-1);
        
        var output = ready;
        var column = 'datetime';
        var parsed = output;
    } else if (searchtype == 'city'){
        var intermediate = inputtext;
        var output = intermediate.toLowerCase();
        var column = 'city';
        var parsed = output;
    } else if (searchtype == 'state'){
        var intermediate = inputtext;
        var output = intermediate.toLowerCase();
        var column = 'state';
        var parsed = output;
    } else if (searchtype == 'country'){
        var intermediate = inputtext;
        var output = intermediate.toLowerCase();
        var column = 'country';
        var parsed = output;
    } else if (searchtype == 'shape'){
        var intermediate = inputtext;
        var output = intermediate.toLowerCase();
        var column = 'shape';
        var parsed = output;
    } else if (searchtype == 'durationMinutes'){
        var intermediate = inputtext;
        var output = intermediate
        var column = 'durationMinutes';
        var parsed = String(output);
    } 

    return {
        parsed: parsed,
        column: column
    }
}