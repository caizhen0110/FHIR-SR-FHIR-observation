
var FindingObservation={
  "resourceType": "Observation",
  "id": "51870e95-691b-489b-8b54-adc32ee131ee",
  "meta": {
    "versionId": "2",
    "lastUpdated": "2023-03-21T22:09:12.343+08:00",
    "source": "#0uNKFzbRLMB1zxAp",
    "profile": [
      "https://203.64.84.150:58443/r5/fhir/StructureDefinition/ImageFindingObservationSDR4"
    ]
  },
  "text": {
    "status": "generated",
    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">This is an image finding measurement</div>"
  },
  "extension": [
    {
      "url": "https://203.64.84.150:58443/r5/fhir/StructureDefinition/FindingIDR4",
      "valueIdentifier": {
        "system": "https://docs.google.com/spreadsheets/d/1BBBZZbEO82wkvLbHtbpa4ihdFTMoIG0KQGH5bgUoo70/edit#gid=896973653",
        "value": "S2023-00135"
      }
    }
  ],
  "status": "final",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "imaging",
          "display": "Imaging"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
        "code": "image.finding",
        "display": "Image finding"
      }
    ]
  },
  "subject": {
    "reference": "Patient/9042059",
    "display": "何采榛"
  },
  "effectiveDateTime": "2023-04-07T13:28:17-05:00",
  "performer": [
    {
      "reference": "Practitioner/9072564",
      "display": "Dr. Adam Careful"
    }
  ],
  "bodySite": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "7769000",
        "display": "Right foot"
      }
    ]
  },
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "https://203.64.84.150:58443/r5/fhir/CodeSystem/8f414151-bf5f-46ce-94fe-f96d9e867d29",
            "code": "image.finding.keyimage"
          }
        ]
      },
      "valueString": "https://203.64.84.150:58443/r5/fhir/DocumentReference/665f781e-5666-4e22-a3c9-638d23ca1043"
    },
    {
      "code":{
        "coding":[{
          "system":"Codesystem/TCUMIH707",
          "code":"Procedure"
        }]
      }
    },
    {
      "code":{
        "coding":[{
          "system":"Codesystem/TCUMIH707",
          "code":"Dose"
        }]
      }
    },
    {
      "code":{
        "coding":[{
          "system":"Codesystem/TCUMIH707",
          "code":"Clinical information"
        }]
      }
    },
    {
      "code":{
        "coding":[{
          "system":"Codesystem/TCUMIH707",
          "code":"Comparison"
        }]
      }
    },
    {
      "code":{
        "coding":[{
          "system":"Codesystem/TCUMIH707",
          "code":"Impression"
        }]
      }
    }
  ]
}

function Submit(){
  //把網頁輸入的資料填入Json
  FindingObservation.component[1].valueString=document.getElementsByName("Procedure")[0].value;
  FindingObservation.component[2].valueInteger=document.getElementsByName("Dose")[0].value;
  FindingObservation.component[3].valueString=document.getElementsByName("Clinical information")[0].value;
  FindingObservation.component[4].valueString=document.getElementsByName("Comparison")[0].value;
  FindingObservation.component[5].valueString=document.getElementsByName("Impression")[0].value;
  //把JSON上傳到FHIR伺服器
  postData(FindingObservation,"Observation")
}

function postData(jsonString, type) {
  var xhttp = new XMLHttpRequest();
  var fhirUrl= "https://hapi.fhir.org/baseR4";
  var url = fhirUrl +"/"+type;
  xhttp.open("POST", url, false);
  xhttp.setRequestHeader("Content-type", 'application/json+fhir');
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4) // && this.status == 201) 
      {
          ret = JSON.parse(this.responseText);
          alert(this.responseText);
      }
  };
  var data = JSON.stringify(jsonString);
  xhttp.send(data);
}