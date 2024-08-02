var radio = document.getElementById('manual-btn');
var cont = 1

document.getElementById('radio1').checked = true

setInterval(() => {
    nextCard()
}, 5000)

function nextCard() {
    cont++

    if (cont > 3) {
        cont = 1
    }
    document.getElementById('radio' + cont).checked = true
}