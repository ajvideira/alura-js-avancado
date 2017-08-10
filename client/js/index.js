var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

var tBody = document.querySelector('.table tbody'),
    td = null,
    tr = null;

document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    tr = document.createElement('tr');
    
    campos.forEach(function (campo) {
        td = document.createElement('td');
        td.textContent = campo.value/home/jonathan/Downloads/Detect.js-master/detect.min.js;
        tr.appendChild(td);
    });
    
    td = document.createElement('td');
    td.textContent = campos[1].value * campos[2].value;
    tr.appendChild(td);
    
    tBody.appendChild(tr);
    
});
 