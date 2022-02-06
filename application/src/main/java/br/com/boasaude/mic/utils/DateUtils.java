package br.com.boasaude.mic.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

import org.springframework.stereotype.Component;

@Component("dateUtils")
public class DateUtils {

	private static SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");
	public static final SimpleDateFormat US_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	
    public static GregorianCalendar convertFromDMY(String dd_mm_yy) throws ParseException{

        String[] splitDate = dd_mm_yy.split("/");
        int days = Integer.parseInt(splitDate[0]);
        int month = (Integer.parseInt(splitDate[1]) - 1);
        int year = Integer.parseInt(splitDate[2]);

        GregorianCalendar dateConverted = new GregorianCalendar(year, month, days);

        return dateConverted;
    }

    public static Calendar convert(String str_date, SimpleDateFormat formatter) throws ParseException{

    	 Date date = (Date)formatter.parse(str_date); 
    	 
    	 Calendar calendar 	= Calendar.getInstance();
    	 calendar.setTime(date);
    	 
    	 return calendar;
    }
    
    public static GregorianCalendar convertFromDMY(String dd_mm_yy, String sep) throws ParseException{

        String[] splitDate = dd_mm_yy.split(sep);
        int days = Integer.parseInt(splitDate[0]);
        int month = (Integer.parseInt(splitDate[1]) - 1);
        int year = Integer.parseInt(splitDate[2]);

        GregorianCalendar dateConverted = new GregorianCalendar(year, month, days);

        return dateConverted;
    }
    
    

    public static Calendar convertFromDMYHHMM(String strDate) throws ParseException{
    	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    	Date date = sdf.parse(strDate);
    	Calendar cal = Calendar.getInstance();
    	cal.setTime(date);

    	return cal;
    }
    
    
    public static String format(Calendar date){

       fmt.setCalendar(date);
        String dateFormatted = fmt.format(date.getTime());
        return dateFormatted;
    }
    
    public static String format(Calendar date, SimpleDateFormat sdformat){

    	sdformat.setCalendar(date);
        String dateFormatted = sdformat.format(date.getTime());
         
        return dateFormatted;
     }
    
    public static String getTextDate(Calendar cal) {
    	return getDay(cal) + " de " + getMonth(cal) + " de " + cal.get(GregorianCalendar.YEAR) + " as " + getHour(cal);
    	
    }
    
    private static String getHour(Calendar cal){  
        DateFormat dfmt = new SimpleDateFormat("HH:mm:ss");  
        return dfmt.format(cal.getTime());  
    }
    
    private static String getMonth(Calendar cal){  
        DateFormat dfmt = new SimpleDateFormat("MMMM");  
        return dfmt.format(cal.getTime());  
    }
    
    private static int getDay(Calendar cal){
       return cal.get(GregorianCalendar.DAY_OF_MONTH);
    }
    
    private static int deductDates( Date initialDate, Date finalDate ) {
    	
    	if( initialDate == null || finalDate == null ) {
    		return 0;
    	}

    	int days = ( int ) ( ( finalDate.getTime() - initialDate.getTime() )/( 24*60*60*1000 ) );
    	
    	
    	return ( days > 0 ? days : 0 ) ;
    }
    
    public static int getWorkingDays(Date initialDate, Date finalDate ){
    	
    	int workingDays = 0;
    	int totalDays 	= deductDates( initialDate, finalDate );
   	
    	Calendar calendar = new GregorianCalendar(finalDate.getYear(), finalDate.getMonth(), finalDate.getDay() );
    	
    	for( int i = 0; i <= totalDays; i++ ) {
    		
    		if( !( calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY ) && !( calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY ) ) {
    			workingDays++;
    		}
    		calendar.add( Calendar.DATE, 1 );
    	}
    	
    	return workingDays;
    }
   
}
