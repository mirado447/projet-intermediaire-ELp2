import AWS from 'aws-sdk';

export default function ProcessImageSmile() {
    AnonLog();
    var control : any = document.getElementById("fileToUpload");
    var file = control.files[0];
  
    // Load base64 encoded image for display 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e : any) {
        //Call Rekognition  
        AWS.config.region = "eu-west-2";  
        var rekognition = new AWS.Rekognition();
        var params = {
          Image: {
          Bytes: e.target.result
        },
        Attributes: [
        'ALL',
      ]
    };
    rekognition.detectFaces(params, function (err : any, data : any) {
      var result : any = document.getElementById("opSmile");
      if (err) console.log(err, err.stack); // an error occurred
      else {
       var table = "<table><tr><th>Smile</th><td><ul>";
        // show each face and build out estimated age table
        for (var i = 0; i < data.FaceDetails.length; i++) {
          table += '<ul>Value: ' + data.FaceDetails[i].Smile.Value + '</ul>'+ 
            '<ul>Confidence: ' + data.FaceDetails[i].Smile.Confidence + '</ul>';
        }
        table += "</table>";
        result.innerHTML = table;
      }
    });
  
      };
    })(file);
    reader.readAsArrayBuffer(file);
  }
  //Provides anonymous log on to AWS services
  function AnonLog() : void {
    
    // Configure the credentials provider to use your identity pool
    AWS.config.region = 'eu-west-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
    });
    // Make the call to obtain credentials
    AWS.config.getCredentials(function () {
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials?.accessKeyId;
      var secretAccessKey = AWS.config.credentials?.secretAccessKey;
      var sessionToken = AWS.config.credentials?.sessionToken;
    });
  }
