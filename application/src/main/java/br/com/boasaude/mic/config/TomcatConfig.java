package br.com.boasaude.mic.config;

import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.apache.log4j.Logger;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Configuration;


public class TomcatConfig implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

	private final static Logger logger = Logger.getLogger(TomcatConfig.class);

	@Override
	  public void customize(TomcatServletWebServerFactory factory) {
	    factory.addConnectorCustomizers(connector -> {
	      AbstractHttp11Protocol protocol = (AbstractHttp11Protocol) connector.getProtocolHandler();

	      int originMaxKeepAliveRequests = protocol.getMaxKeepAliveRequests();
	      protocol.setMaxKeepAliveRequests(-1);
	      
	      int originKeepAliveTimeout = protocol.getKeepAliveTimeout();
	      protocol.setKeepAliveTimeout(60000);

	      logger.info("####################################################################################");
	      logger.info("#");
	      logger.info("# TomcatCustomizer");
	      logger.info("#");
	      logger.info("# origin maxKeepAliveRequests" +  originMaxKeepAliveRequests);
	      logger.info("# custom maxKeepAliveRequests" + protocol.getMaxKeepAliveRequests());
	      logger.info("# origin keepalive timeout: ms" + originKeepAliveTimeout);
	      logger.info("# keepalive timeout: ms" +protocol.getKeepAliveTimeout());
	      logger.info("# connection timeout: ms" + protocol.getConnectionTimeout());
	      logger.info("# max connections: " + protocol.getMaxConnections());
	      logger.info("#");
	      logger.info("####################################################################################");

	    });
	}
}
