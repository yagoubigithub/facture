 # Facture
 > This component is four display a table of data as a bill 


### Demo  [Facture](https://modest-lamarr-34f25a.netlify.com/)

##  Exemple :

```
const data = [
  {
    id: 0,
    nb_tech: 3,
    heure_debut: "08:15",
    heure_fin: "13:00",
    date: "27-01-2019",
    barème: 20,
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
    ]
  },
  {
    id: 1,
    nb_tech: 1,
    heure_debut: "08:15",
    heure_fin: "13:35",
    date: "27-01-2019",
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
    ]
  }
];
```
```<Facture tva={4} data={data} />```
### The props :

##### data  : array of object the format of the object  is:
id : (int)
nb_tech : (int)
heure_debut : "hh:mm"
heure_fin: "hh:mm"
date: "dd-mm-yyyy",
barème: (decimal),
techniciens: [
      {
        nom: (string),
        prenom: (string),
        nb_heur: "hh:mm"
      },...]
##### tva : decimal












