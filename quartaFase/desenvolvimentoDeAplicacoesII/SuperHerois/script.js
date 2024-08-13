const headerTable = document.getElementById('header');
const bodyTable = document.getElementById('body');
const exception = document.getElementById('exception');
const filter = document.getElementById('filter');

const nameColunms = ['id', 'name', 'alterEgos', 'intelligence', 'strength', 'speed', 'durability', 'power', 'combat' ];

headerTable.innerHTML = nameColunms.map(colunms => {
    return `<th>${colunms}</th>`;
}).join('');

fetch('https://akabab.github.io/superhero-api/api/all.json')
.then((resp) => resp.json())
.then(data => {
    if (!Array.isArray(data) || data.length === 0) {
        exception.innerHTML = `<span>Sem conteudo para exibir</span>`;
        return;
    }
    data.forEach(hero => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hero.id}</td>
            <td>${hero.name}</td>
            <td>${hero.biography.alterEgos}</td>
            <td>${hero.powerstats.intelligence}</td>
            <td>${hero.powerstats.strength}</td>
            <td>${hero.powerstats.speed}</td>
            <td>${hero.powerstats.durability}</td>
            <td>${hero.powerstats.power}</td>
            <td>${hero.powerstats.combat}</td>
        `;
        bodyTable.appendChild(row);
    });

    console.log(data);
    filterDc(data)
    filterSort(data)
    filterReduce(data)
})
.catch(error => {
    console.log(error);
});

function filterDc(Data) {
    const result = Data.filter(hero => hero.biography.publisher === 'DC Comics');
    console.log('filter dc comics');
    console.log({ result: result });
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
}

function filterSort(Data) {
    const orderByMame = Data.sort((a, b) => a.name.length - b.name.length);
    console.log('Ordenando pelo tamanho do nome do heroi');
    console.log({ OrderByMame: orderByMame });
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
}

function filterReduce(Data) {
    const totalCharacters = Data.filter(hero => hero.biography.publisher === 'Marvel Comics')
        .reduce((acc, hero) => acc + (hero.biography.firstAppearance ? hero.biography.firstAppearance.length : 0), 0);
    console.log('Total de caracteres de first_appearance dos heróis da Marvel Comics');
    console.log({ totalCharacters: totalCharacters });
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
}