export type VertexData = {
    nome: string
}

export class VertexEntity {
    constructor(private readonly data: VertexData) {}

    public static executar(input: VertexData): VertexEntity {
        return new VertexEntity(input);
    }

    public get nome(): string {
        return this.data.nome;
    }
}