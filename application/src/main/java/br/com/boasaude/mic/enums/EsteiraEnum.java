package br.com.boasaude.mic.enums;

public enum EsteiraEnum {

    CORBAN(1,"Corban"),
    NINHO(2,"Ninho");

	private int id;
    private String status;

    EsteiraEnum(int idStatus, String status) {
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
