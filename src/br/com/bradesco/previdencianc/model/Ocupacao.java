package br.com.bradesco.previdencianc.model;

public class Ocupacao {
    
    private String codOcupacao;
    private String descOcupacao;

    public Ocupacao(String codOcupacao, String descOcupacao) {
        this.codOcupacao = codOcupacao;
        this.descOcupacao = descOcupacao;
    }

    // Getters e Setters
    public String getCodOcupacao() {
        return codOcupacao;
    }
    public void setCodOcupacao(String codOcupacao) {
        this.codOcupacao = codOcupacao;
    }
    public String getDescOcupacao() {
        return descOcupacao;
    }
    public void setDescOcupacao(String descOcupacao) {
        this.descOcupacao = descOcupacao;
    }
}