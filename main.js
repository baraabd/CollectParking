var timb,minb,tims,mins,datepickerb,datepickers,dbd,dbm,dby
,dsd,dsm,dsy,diffMs,diffDays,diffHrs,diffMins,tb,ts,fromhourb,tillhours,tillhourtb;
var date1 =document.getElementById('db').value;    
var date2 = document.getElementById('ds').value; 
const fromhour=9;
const tillhour=18;
const maxprice=25;
const hourprice=5;
const firsthour=12;
const othertime=0;

var costfor=0;
var cost1=0;

function calculateFunction() 
{       
     getdate();
     dt1 = new Date(dby,dbm,dbd);
     dt2 = new Date(dsy,dsm,dsd);
     dt1m = new Date(dby,dbm,dbd,timb,minb);
     dt2m= new Date(dsy,dsm,dsd,tims,mins);  
     tb= new Date(dsy,dsm,dsd,timb,minb);          
     ts= new Date(dsy,dsm,dsd,tims,mins);  
     fromhourt= new Date(dsy,dsm,dsd,fromhour,'0');          
     tillhourt= new Date(dsy,dsm,dsd,tillhour,'0'); 
     tillhourtb= new Date(dby,dbm,dbd,tillhour,'0'); 

     if (dt2.getTime() < dt1.getTime()){
        alert("Det går inte att fälja slutdatam mindre än börjadatum!");
    } else {

    if (dt1.getTime() == dt2.getTime()){        
        if (parseInt(timb)>=fromhour && (parseInt(minb)>=0) && (parseInt(tims)<=tillhour) && (parseInt(mins)>=0)){                                 
            var summin = (diff_minutes(dt1m, dt2m)) - 60;
            summin= summin / 60;              
            var cost1 = firsthour + (summin * hourprice);              
            checkprice(cost1);

        }   else if(parseInt(timb)<fromhour && (parseInt(minb)>=0) && (parseInt(tims)<=tillhour) && (parseInt(mins)>=0)) {                 
                var TimeTimbToFrommhour = (calcTimeInMinuts(tb,fromhourt)); 
                var costOutTime = calculateCostOutTime(TimeTimbToFrommhour); 
                var TimeDt1mToDt2m = (calcTimeInMinuts(dt2m, fromhourt));                    
                var costUnderTime = calculatecostUnderTime(TimeDt1mToDt2m);          
                var cost1 = costOutTime + costUnderTime;               
                checkprice(cost1,maxprice);        

            }   else if(parseInt(timb)>=fromhour && (parseInt(minb)>=0) && (parseInt(tims)>tillhour) && (parseInt(mins)>=0)) {           
                    var TimeDt1mToDt2m = (calcTimeInMinuts(dt1m, tillhourt));           
                    var costOutTime = calculatecostUnderTime(TimeDt1mToDt2m);       
                    var TimeDt1mToDt2m = (calcTimeInMinuts(dt2m,tillhourt));        
                    var costUnderTime = calculateCostOutTime(TimeDt1mToDt2m);
                    var cost1 = costOutTime + costUnderTime;            
                    checkprice(cost1,maxprice);               
                
                }   else if(parseInt(timb)<fromhour && (parseInt(minb)>=0) && (parseInt(tims)>tillhour) && (parseInt(mins)>=0)) {                
                        var TimeTimbToFrommhour = (calcTimeInMinuts(tb,fromhourt)); 
                        var costOutTime = calculateCostOutTime(TimeTimbToFrommhour);                  
                        var TimeDt1mToDt2m = (calcTimeInMinuts(fromhourt, tillhourt));       
                        var costOutTime = calculatecostUnderTime(TimeDt1mToDt2m);      
                        var TimeDt1mToDt2m = (calcTimeInMinuts(dt2m,tillhourt));         
                        var costUnderTime = calculateCostOutTime(TimeDt1mToDt2m);  
                        var cost1 = costOutTime + costUnderTime;              
                    }   checkprice(cost1,maxprice);     

              
        checkprice(cost1,maxprice);
      

    }   else if(dt1.getTime() !== dt2.getTime()){ 
                var diffDays = (diff_days(dt2, dt1)+1);
                var i; 

                for (i = 0; i < diffDays; i++) {

                    if (i===0){
                      
                      
                      
                        if(parseInt(timb)<fromhour && (parseInt(minb)>=0)) {                      
                            var TimeTimbToFrommhour = (calcTimeInMinuts(tb,fromhourt));  
                            var costOutTime = calculateCostOutTime(TimeTimbToFrommhour);                  
                            var TimeDt1mToDt2m = (calcTimeInMinuts(fromhourt, tillhourt));                  
                            var costUnderTime = calculatecostUnderTime(TimeDt1mToDt2m);                   
                            cost1 = costOutTime + costUnderTime;                             

                        }   else if(parseInt(timb)>=fromhour && (parseInt(minb)>=0)){                  
                                var TimeDt1mToDt2m = (calcTimeInMinuts(tillhourtb, dt1m));                   
                                var costUnderTime = calculatecostUnderTime(TimeDt1mToDt2m);                                                   
                                cost1 = costUnderTime;                                      
                            }
                          

                    }   else if (i===diffDays-1) {                                                 
                           
                            if ((parseInt(tims)<=tillhour) && (parseInt(mins)>=0)){                 
                                var ss = fromhour * 60;                       
                                var calculatehour2 = 1440 - ss;                   
                                var costOutTime = calculateCostOutTime(calculatehour2);                  
                                var TimeDt1mToDt2m = (calcTimeInMinuts(fromhourt,ts));                 
                                var calculatecostUnderTimeLast1 = calculatecostUnderTimeLast(TimeDt1mToDt2m);                 
                                cost1 = calculatecostUnderTimeLast1 + costOutTime ;                                

                            }   else if((parseInt(tims)>tillhour) && (parseInt(mins)>=0)){
                                    var ss = fromhour * 60;                       
                                    var calculatehour2 = 1440 - ss;                   
                                    var costOutTime1 = calculateCostOutTime(calculatehour2);                
                                    var TimeDt1mToDt2m = (calcTimeInMinuts(fromhourt, tillhourt));                   
                                    var costUnderTime = calculatecostUnderTimeLast(TimeDt1mToDt2m);  
                                    var TimeDt1mToDt2m = (calcTimeInMinuts(dt2m,tillhourt));                    
                                    var costOutTime2 = calculateCostOutTime(TimeDt1mToDt2m);                  
                                    cost1 = costOutTime1 + costUnderTime + costOutTime2;                   
                                   
                                }   

                    }   else if (i!==diffDays && i!==0) {                           
                            var ss = fromhour * 60;                       
                            var calculatehour2 = 1440 - ss;                  
                            var costOutTime1 = calculateCostOutTime(calculatehour2);
                            var TimeDt1mToDt2m = (calcTimeInMinuts(fromhourt, tillhourt));                    
                            var costUnderTime = calculatecostUnderTimeLast(TimeDt1mToDt2m);                     
                            cost1 = costOutTime1 + costUnderTime;                                 
                           
                        }   
                                                      
                    costfor= costfor + cost1;
                   
                }            
              
            checkprice(costfor,maxprice);           
        }
    } 
}

function checkprice(parkingcost1,maxprice)
{
    if (parkingcost1 >= maxprice){
        document.getElementById("resultat").innerHTML= maxprice + " kr";  
      
    } else{
        document.getElementById("resultat").innerHTML= parkingcost1.toFixed(2) + " kr";                                                    
       
    }
}


var x = document.getElementById("myBtn");
x.addEventListener("click", calculateFunction);



function getdate()
{    
    timb = document.getElementById('timb').value
    minb = document.getElementById('minb').value;
    tims = document.getElementById('tims').value;
    mins = document.getElementById('mins').value;     
    datepickerb = document.getElementById('db').value;    
    datepickers = document.getElementById('ds').value; 

    dbd = datepickerb.substring(0, 2);    
    dbm = datepickers.substring(3, 5);    
    dby = datepickerb.substring(6, 10);   
    dsd = datepickers.substring(0, 2);    
    dsm = datepickers.substring(3, 5);  
    dsy = datepickers.substring(6, 10);      
}

function calculateMin(minuts)
{
    minuts=diff_minutes(dt1m, dt2m);
    var diffm,sum;
}



//حساب تكلفة الدقائق داخل الوقت المحدد
function calculatecostUnderTime(minuts)
{
    minuts -= 60;  
    var hourtotal = minuts / 60 ;                   
    var parkingCostUnderTime = firsthour + (hourtotal * hourprice);                                 
    return parkingCostUnderTime;
}

//حساب تكلفة الدقائق داخل الوقت المحدد
function calculatecostUnderTimeLast(minuts)
{
    var hourtotal = minuts / 60 ;                   
    var parkingCostUnderTime =  hourtotal * hourprice;
    return parkingCostUnderTime;
}


//حساب تكلفة الوقت خارج الوقت المحدد
function calculateCostOutTime(minuts)
{              
    var hourtotal = minuts / 60 ;
    var parkingCostOutTime = (hourtotal * othertime);                                     
    return parkingCostOutTime;
}
// حساب الوقت ضمن تاريخين
function calcTimeInMinuts(Firsttime, Secondtime) 
{       
    var diff =(Firsttime.getTime() - Secondtime.getTime()) / 1000;  
    diff /= 60;
    return Math.abs(Math.round(diff));
}   



function diff_minutes(dt2, dt1) 
{          
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;  
    diff /= 60;  
    return Math.abs(Math.round(diff));
}   



function diff_hours(dt2, dt1) 
{         
    diffHrs = Math.floor((difft % 86400000) / 3600000); // hours  
    return Math.abs(Math.round(diffHrs));
}   


function diff_days(dt2, dt1) 
{     
    var diffd =(dt1.getTime() - dt2.getTime());      
    diffDays = Math.floor(diffd / 86400000); // days     
    return Math.abs(Math.round(diffDays));
}  

