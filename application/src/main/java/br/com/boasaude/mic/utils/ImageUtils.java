package br.com.boasaude.mic.utils;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;

public class ImageUtils {

	private Map<String, String> extensions = new HashMap<String, String>();
	
	private static ImageUtils instance;
	
	public ImageUtils() {
		extensions = new HashMap<>();
		extensions.put("image/png", "png");
		extensions.put("image/jpg", "jpg");
		extensions.put("image/jpeg", "jpg");
		extensions.put("image/git", "gif");
	}
	
	public static ImageUtils instance() {
		return instance == null ? new ImageUtils() : instance;
	}
	
	public String getImageExtension(String imageType) {
		return extensions.get(imageType);
	}
	
	public BufferedImage decodeToImage(String imageString) {
		 
        BufferedImage image = null;
        byte[] imageByte;
        try {
            imageByte = Base64.decodeBase64(imageString.split(",")[1]);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return image;
    }

	
}
