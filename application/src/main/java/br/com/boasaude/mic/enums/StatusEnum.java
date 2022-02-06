package br.com.boasaude.mic.enums;

public enum StatusEnum {

    PENDENTE(1,"Pendente"),
    CONCLUIDO(2,"Concluido"),
    REPROVADA(3,"Reprovada"),
    PENDENTE_FRANQUEADORA(39, "Pendente Franqueadora");

	private int id;
    private String status;

    StatusEnum(int idStatus, String status) {
        this.status = status;
        this.id = idStatus;
    }

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	
	public Long getId() {
		return new Long(id);
	}
    
}
