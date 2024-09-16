// Generator repositories

var repositories = document.getElementById('repositories')

const cardRepositories = [
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Calculadora',
        img: './img/calculadora.png',
        descricao: 'Calculadora em JS',
        linkRepository: 'https://github.com/BUHW/Calculadora' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
    {
        name: 'Comafe',
        img: './img/logoSemFundo.png',
        descricao: 'Site empresarial',
        linkRepository: 'https://github.com/BUHW/COMAFE' 
    },
]

cardRepositories.forEach((card) => {
    repositories.innerHTML += `
        <div class="card">
            <div class="image-container">
                <img src="${card.img}" alt="${card.name}" />
            </div>
            <div class="card-content">
                <h2>${card.name}</h2>
                <h4>${card.descricao}</h4>
                <a href="${card.linkRepository}" target="_blank"><button>VER REPOSITÓRIO</button></a>
            </div>
        </div>    
    `
});

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

