import AWS from 'aws-sdk';


export default function ProcessImgBeard(){
  Anonlog();
 var control : any = document.getElementById("fileToUpload");
 var file = control.files[0];

 var reader = new FileReader();
 reader.onload = (function(theFile){
   return (function(e:any){
     AWS.config.region = "eu-west-2";
     var rekognition = new AWS.Rekognition();
     var params = {
       Image:{
         Bytes: e.target.result
       },
       Attributes:[
         'ALL'
       ]
     };
     rekognition.detectFaces(params,function(err:any,data:any){
       var result : any = document.getElementById("opBeard");
       if(err) console.log(err,err.stack);
       else{
         var table = "<table><tr><th>Breard</th><td><ul>";
         for(var i =0 ; i< data.FaceDetails.length; i ++){
           table += '<ul>Value: ' + data.FaceDetails[i].Beard.Value + '</ul>'+
           '<ul>Confidence: ' + data.FaceDetails[i].Beard.Confidence + '</ul>';
         }
         table += "</table>";
         result.innerHTML = table;
       }
       
     });
   });

 })(file);
 reader.readAsArrayBuffer(file);

}
 function Anonlog() : void{
   AWS.config.region = 'eu-west-2';
   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
     IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
   });

   AWS.config.getCredentials(function(){
    var accessKeyId = AWS.config.credentials?.accessKeyId;
    var secretAccessKey = AWS.config.credentials?.secretAccessKey;
    var sessionToken = AWS.config.credentials?.sessionToken;
   });
 }