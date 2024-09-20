package org.example.agenda;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Agenda {
    private HashMap<String, Contato> contatos;

    public Agenda() {
        contatos = new HashMap<>();
    }

    public void inserirContato(String nome, String telefone, String endereco) {
        if (nome.isEmpty() || telefone.isEmpty() || endereco.isEmpty()) {
            System.out.println("Erro: Nome, telefone ou endereço não podem estar vazios.");
            return;
        }

        Contato contato = new Contato(nome, telefone, endereco);
        contatos.put(telefone, contato);
        System.out.println("Contato inserido com sucesso.");
    }

    public void removerContatoPorNomePessoal(String nome) {
        String telefone = null;

        for (Map.Entry<String, Contato> entry : contatos.entrySet()) {
            if (entry.getValue().getNome().equals(nome)) {
                telefone = entry.getKey();
                break;
            }
        }

        if (telefone == null) {
            System.out.println("Nome não encontrado para remover, tente novamente");
            return;
        }

        contatos.remove(telefone);
        System.out.println("Nome " + nome + " removido com sucesso");
    }

    public void removerContatoPorTelefone(String telefone) {
        if ( !contatos.containsKey(telefone) ) {
            System.out.println("Telefone não encontrado para remover, tente novamente");
            return;
        }

        contatos.remove(telefone);
        System.out.println("Contato " + telefone + " removido com sucesso");
    }

    public void listarContatos() {
        for (Contato contato : contatos.values()) {
            System.out.println(contato);
        }
    }

    public void localizarContatoPorNomePessoal(String nome) {
        boolean encontrado = false;

        for (Contato contato : contatos.values()) {
            if (contato.getNome().equalsIgnoreCase(nome)) {
                System.out.println("Contato encontrado: ");
                System.out.println("Nome: " + contato.getNome());
                System.out.println("Telefone: " + contato.getTelefone());
                System.out.println("Endereço: " + contato.getEndereco());
                encontrado = true;
            }
        }

        if (!encontrado) {
            System.out.println("Nenhum contato encontrado com o nome: " + nome);
        }
    }

    public void localizarContatoPorTelefone(String telefone) {
        boolean encontrado = false;

        for (Contato contato : contatos.values()) {
            if (contato.getTelefone().equalsIgnoreCase(telefone)) {
                System.out.println("Contato encontrado: ");
                System.out.println("Nome: " + contato.getNome());
                System.out.println("Telefone: " + contato.getTelefone());
                System.out.println("Endereço: " + contato.getEndereco());
                encontrado = true;
            }
        }

        if (!encontrado) {
            System.out.println("Nenhum contato encontrado com o telefone: " + telefone);
        }
    }

    public void realizarChamada(String telefone) {
        Contato contato = contatos.get(telefone);

        if (contato != null) {
            System.out.println("Chamando " + contato.getNome() + " no número " + telefone + "...");

            Scanner scanner = new Scanner(System.in);
            boolean emChamada = true;

            while (emChamada) {
                System.out.println("caso queira sair da chamda digite 1");
                int opcao = scanner.nextInt();

                switch (opcao) {
                    case 1:
                        System.out.println("Chamada cancelada.");
                        emChamada = false;
                        break;
                    default:
                        System.out.println("Opção inválida. Tente novamente.");
                }
            }
        } else {
            System.out.println("Nenhum contato encontrado com o telefone: " + telefone);
        }
    }

    public void limparAgenda() {
        System.out.println("Limpando agenda... aguarde");
        contatos.clear();
        System.out.println("Agenda limpa!");
    }

}
