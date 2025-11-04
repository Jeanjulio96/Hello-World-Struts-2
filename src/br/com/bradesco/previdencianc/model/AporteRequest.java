package br.com.bradesco.previdencianc.model;

public class AporteRequest {

    // Campos do formulário
    private String nmParticipante;
    private String cpfApresentacao;
    private String dtNascimento;
    private String sexo;
    private String estadoCivil;
    private String descricaoOcupacao;
    private String vlrRendaMesFluxo;
    private String numTelefone;
    private String emailParticipante;
    private String cepMascara;
    private String logradouro;
    private String bairro;
    private String nrEndereco;
    private boolean flagSemNumero;
    private String complementoParticipante;
    private String municipio;
    private String uf;
    private String origemRecProdt;
    private String observacaoOrigem;
    
    // Objeto aninhado para dados do participante
    private DetalhaDadosParticipante detalhaDadosParticipante = new DetalhaDadosParticipante();

    // Getters e Setters para todos os campos...

    public String getNmParticipante() {
        return nmParticipante;
    }

    public void setNmParticipante(String nmParticipante) {
        this.nmParticipante = nmParticipante;
    }

    public String getCpfApresentacao() {
        return cpfApresentacao;
    }

    public void setCpfApresentacao(String cpfApresentacao) {
        this.cpfApresentacao = cpfApresentacao;
    }

    public String getDtNascimento() {
        return dtNascimento;
    }

    public void setDtNascimento(String dtNascimento) {
        this.dtNascimento = dtNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getDescricaoOcupacao() {
        return descricaoOcupacao;
    }

    public void setDescricaoOcupacao(String descricaoOcupacao) {
        this.descricaoOcupacao = descricaoOcupacao;
    }

    public String getVlrRendaMesFluxo() {
        return vlrRendaMesFluxo;
    }

    public void setVlrRendaMesFluxo(String vlrRendaMesFluxo) {
        this.vlrRendaMesFluxo = vlrRendaMesFluxo;
    }

    public String getNumTelefone() {
        return numTelefone;
    }

    public void setNumTelefone(String numTelefone) {
        this.numTelefone = numTelefone;
    }

    public String getEmailParticipante() {
        return emailParticipante;
    }

    public void setEmailParticipante(String emailParticipante) {
        this.emailParticipante = emailParticipante;
    }

    public String getCepMascara() {
        return cepMascara;
    }

    public void setCepMascara(String cepMascara) {
        this.cepMascara = cepMascara;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getNrEndereco() {
        return nrEndereco;
    }

    public void setNrEndereco(String nrEndereco) {
        this.nrEndereco = nrEndereco;
    }

    public boolean isFlagSemNumero() {
        return flagSemNumero;
    }

    public void setFlagSemNumero(boolean flagSemNumero) {
        this.flagSemNumero = flagSemNumero;
    }

    public String getComplementoParticipante() {
        return complementoParticipante;
    }

    public void setComplementoParticipante(String complementoParticipante) {
        this.complementoParticipante = complementoParticipante;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getOrigemRecProdt() {
        return origemRecProdt;
    }

    public void setOrigemRecProdt(String origemRecProdt) {
        this.origemRecProdt = origemRecProdt;
    }

    public String getObservacaoOrigem() {
        return observacaoOrigem;
    }

    public void setObservacaoOrigem(String observacaoOrigem) {
        this.observacaoOrigem = observacaoOrigem;
    }

    public DetalhaDadosParticipante getDetalhaDadosParticipante() {
        return detalhaDadosParticipante;
    }

    public void setDetalhaDadosParticipante(DetalhaDadosParticipante detalhaDadosParticipante) {
        this.detalhaDadosParticipante = detalhaDadosParticipante;
    }
}