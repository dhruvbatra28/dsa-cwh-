function cleardisplay() {
    document.getElementById('disp').value = '';
}

function display(value) {
    let disp = document.getElementById('disp');
    disp.value = disp.value +value;
}

function calculate() {
    let display = document.getElementById('disp');
     {
        disp.value = eval(disp.value);
    } 
}
