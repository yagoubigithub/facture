 # Facture
 > This component is for display a table of data as a bill 


### Demo  [Facture](https://amazing-ptolemy-056a05.netlify.com/)

##  Exemple :

```
const data = [
  {
    id: 30,
    
    dh_debut: "2014-08-22T08:30",
    dh_fin: "2014-08-22T08:30",
    tarif: 40,
    techniciens: [
    
      {
        nom: "yagoubi",
        prenom: "AEK",
        temps: "2:30"
      },
      {
        nom: "Rahili",
        prenom: "AEK",
        temps: "2:10"
      },
      {
        nom: "Yagoubi",
        prenom: "AEK",
        temps: "2:30"
      }
    ],
    consommable : [

    ]
  },
  {
    id: 1,
   
    dh_debut: "2014-08-22T08:30",
    dh_fin: "2014-08-22T11:30",
  
    tarif: 140,
    techniciens: [
      {
        nom: "Sedik",
        prenom: "Ilyes",
        temps: "4:45"
      },
      {
        nom: "Sedik",
        prenom: "Ilyes",
        temps: "2:30"
      },
      {
        nom: "rahili",
        prenom: "abdelhadi",
        temps: "2:30"
      }
    ],
    consommable : [

      {
        article : "Disque 1To",
        qte : 1,
        cout : 120.5
      },
      {
        article : "Cable Rj45",
        qte : 4,
        cout : 10
      }

    ]
  },

  
];
```
```<Facture tva={4} data={data} />```
### The props :

##### data  : array of object the format of the object  is:
```sh
id : (int)
dh_debut: "DateTime",
dh_fin : "DateTime",
tarif : (decimal),
techniciens: [
      {
        nom : (string),
        prenom : (string),
        temps: "hh:mm"
      },...],
consommable : [
    {
        article : (string),
        qte : (int),
        cout : (decimal),
  },
{...}
]
```
##### tva : decimal












