 # Facture
 > This component is for display a table of data as a bill 


### Demo  [Facture](https://trusting-heisenberg-beddfc.netlify.com/)

##  Exemple :

```
const data = [
  {
    id: 30,
    
    heure_debut: "08:10",
    heure_fin: "13:00",
    date: "2015-03-25",
    barème: 40,
    techniciens: [
    
      {
        nom: "yagoubi",
        prenom: "AEK",
        nb_heur: "2:30"
      },
      {
        nom: "Rahili",
        prenom: "AEK",
        nb_heur: "2:30"
      },
      {
        nom: "Yagoubi",
        prenom: "AEK",
        nb_heur: "2:30"
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
  {
    id: 1,
   
    heure_debut: "08:01",
    heure_fin: "13:35",
    date: "2015-03-23",
    barème: 140,
    techniciens: [
      {
        nom: "Sedik",
        prenom: "Ilyes",
        nb_heur: "2:30"
      },
      {
        nom: "Sedik",
        prenom: "Ilyes",
        nb_heur: "2:30"
      },
      {
        nom: "rahili",
        prenom: "abdelhadi",
        nb_heur: "2:30"
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
  {
    id: 1,

    heure_debut: "08:45",
    heure_fin: "13:50",
    date: "2015-03-29",
    barème: 30,
    techniciens: [
      {
        nom: "Sedik",
        prenom: "Ilyes",
        nb_heur: "2:30"
      },
      {
        nom: "rahili",
        prenom: "abdelhadi",
        nb_heur: "2:30"
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
**id** : (int)
**heure_debut** : "hh:mm"
**heure_fin** : "hh:mm"
**date**: "dd-mm-yyyy",
**barème**: (decimal),
**techniciens**: [
      {
        **nom** : (string),
        **prenom** : (string),
        **nb_heur**: "hh:mm"
      },...],
**consommable** : [
    {
        **article** : (string),
        **qte** : (int),
        **cout** : (decimal),
  },
{...}
]
##### tva : decimal












