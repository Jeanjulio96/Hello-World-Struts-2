package br.com.bradesco.previdencianc.action;

import br.com.bradesco.previdencianc.model.AporteRequest;
import br.com.bradesco.previdencianc.model.Ocupacao;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.Preparable; // 1. Importe a interface

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// 2. Implemente a interface
public class AporteAction extends ActionSupport implements Preparable {

    private AporteRequest aporteRequest = new AporteRequest();

    // As listas continuam aqui
    private Map<String, String> listaSexo;
    private Map<String, String> listaEstadoCivil;
    private Map<String, String> listaUf;
    private Map<String, String> listaRecursos;
    private List<Ocupacao> ocupacoes;


    /**
     * 3. Crie o método prepare(). Ele será executado sempre antes de qualquer action.
     * É o lugar perfeito para carregar dados de selects, menus, etc.
     */
    @Override
    public void prepare() throws Exception {
        // A inicialização das listas agora acontece aqui!
        initLists();
    }

    /**
     * Este método agora só precisa popular os dados iniciais do formulário.
     * A chamada initLists() foi removida daqui.
     */
    @Override
    public String execute() {
        // Simula dados que já viriam pré-carregados na tela
        aporteRequest.setNmParticipante("Ciclano de Souza");
        aporteRequest.setCpfApresentacao("111.222.333-44");
        aporteRequest.setDtNascimento("15031985");
        aporteRequest.setSexo("M");
        
        aporteRequest.getDetalhaDadosParticipante().setPessoaExposta("S"); 
        aporteRequest.getDetalhaDadosParticipante().setRelacionamento("N");

        return INPUT;
    }

    /**
     * Este método agora foca apenas na lógica de negócio.
     * A chamada initLists() foi removida daqui.
     */
    public String confirmacaoDadosAporte() {
        // Se o código chegou aqui, a validação do XML passou.
        System.out.println("Dados validados recebidos. Logradouro: " + aporteRequest.getLogradouro());

        // Lógica de negócio (ex: salvar no banco)

        return SUCCESS;
    }

    // O método initLists() continua o mesmo
    private void initLists() {
        listaSexo = new LinkedHashMap<>();
        listaSexo.put("M", "Masculino");
        listaSexo.put("F", "Feminino");

        listaEstadoCivil = new LinkedHashMap<>();
        listaEstadoCivil.put("0", "Selecione...");
        listaEstadoCivil.put("1", "Solteiro(a)");
        listaEstadoCivil.put("2", "Casado(a)");
        listaEstadoCivil.put("3", "Divorciado(a)");
        listaEstadoCivil.put("4", "Viúvo(a)");
        
        listaUf = new LinkedHashMap<>();
        listaUf.put("0", "Selecione...");
        listaUf.put("MG", "Minas Gerais");
        listaUf.put("SP", "São Paulo");
        listaUf.put("RJ", "Rio de Janeiro");
        // ... etc
        
        listaRecursos = new LinkedHashMap<>();
        listaRecursos.put("0", "Selecione...");
        listaRecursos.put("1", "Salário");
        listaRecursos.put("99", "Outros");
        
        ocupacoes = new ArrayList<>();
        ocupacoes.add(new Ocupacao("102", "MÉDICO CLÍNICO"));
        ocupacoes.add(new Ocupacao("211", "ADVOGADO"));
        ocupacoes.add(new Ocupacao("902", "PROPRIETÁRIO DE ESTABELECIMENTO COMERCIAL"));
    }

    // --- GETTERS E SETTERS (continuam os mesmos) ---
    public AporteRequest getAporteRequest() { return aporteRequest; }
    public void setAporteRequest(AporteRequest aporteRequest) { this.aporteRequest = aporteRequest; }
    public Map<String, String> getListaSexo() { return listaSexo; }
    public Map<String, String> getListaEstadoCivil() { return listaEstadoCivil; }
    public Map<String, String> getListaUf() { return listaUf; }
    public Map<String, String> getListaRecursos() { return listaRecursos; }
    public List<Ocupacao> getOcupacoes() { return ocupacoes; }
}