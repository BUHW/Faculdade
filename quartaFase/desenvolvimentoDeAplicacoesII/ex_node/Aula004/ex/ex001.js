function sum(args) {
    const evenNumbers = args.map(Number).filter(num => num % 2 === 0);

    const sum = evenNumbers.reduce((acc, num) => acc + num, 0);

    console.log(`A soma dos números divisíveis por 2 é: ${sum}`);
}

module.exports = { sum };