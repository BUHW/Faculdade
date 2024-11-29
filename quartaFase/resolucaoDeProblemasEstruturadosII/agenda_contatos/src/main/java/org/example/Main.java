package org.example;

import org.example.agenda.Agenda;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Agenda agenda = new Agenda();
        Scanner scanner = new Scanner(System.in);

        while(true) {
            System.out.println("1. Inserir Contato");
            System.out.println("2. Listar todos os Contatos");
            System.out.println("3. Remover Contato por Telefone");
            System.out.println("4. Remover Contato por Nome Pessoal");
            System.out.println("5. Localizar Contato por Nome Pessoal");
            System.out.println("6. Localizar Contato por Telefone");
            System.out.println("7. Realizar chamada");
            System.out.println("8. Limpar agenda");
            System.out.println("9. Importar contatos");
            System.out.println("10. Exportar contatos");
            System.out.println("0. Sair");

            int opcao = scanner.nextInt();
            scanner.nextLine();

            switch (opcao) {
                case 0:
                    System.out.println("Saindo........");
                    return;
                case 1:
                    System.out.print("Nome: ");
                    String nome = scanner.nextLine();
                    System.out.print("Telefone: ");
                    String telefone = scanner.nextLine();
                    System.out.print("Endereço: ");
                    String endereco = scanner.nextLine();
                    agenda.inserirContato(nome, telefone, endereco);
                    break;
                case 2:
                    agenda.listarContatos();
                    break;
                case 3:
                    System.out.print("Digite o telefone do contato a remover: ");
                    String nomeRemover = scanner.nextLine();
                    agenda.removerContatoPorTelefone(nomeRemover);
                    break;
                case 4:
                    System.out.print("Digite o nome pessoal do contato a remover: ");
                    String nomePessoalRemover = scanner.nextLine();
                    agenda.removerContatoPorNomePessoal(nomePessoalRemover);
                    break;
                case 5:
                    System.out.print("Digite o nome pessoal do contato para localizar o mesmo: ");
                    String nomeLocalizado = scanner.nextLine();
                    agenda.localizarContatoPorNomePessoal(nomeLocalizado);
                    break;
                case 6:
                    System.out.println("Digite o telefone do contato para localizar o mesmo: ");
                    String telefoneLocalizado = scanner.nextLine();
                    agenda.localizarContatoPorTelefone(telefoneLocalizado);
                    break;
                case 7:
                    System.out.println("Digite o telefone do contato para fazer a chamada: ");
                    String fazerChamada = scanner.nextLine();
                    agenda.realizarChamada(fazerChamada);
                    break;
                case 8:
                    agenda.limparAgenda();
                    break;
                default:
                    System.out.println("Opção inválida");
            }
        }
    }
}