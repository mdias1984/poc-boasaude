package br.com.boasaude.mic.utils;

import java.util.HashMap;
import java.util.Map;

public class Context {

	private Map<String, Object> map;

	public Context() {
		map = new HashMap<String, Object>();
	}
	
	public void put(String key, Object value) {
		this.map.put(key, value);
	}
	
	public Object get(String key) {
		return this.map.get(key);
	}
	
	
	public void destroy() {
		this.map.clear();
	}
}
