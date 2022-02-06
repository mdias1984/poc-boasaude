package br.com.boasaude.mic.enums;

public enum StatusDocumentoEnum {

	RASCUNHO("Rascunho"),
    PUBLICADO("Publicado");

    private String status;

	StatusDocumentoEnum(String status) {
        this.status = status;
    }

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
}
