import React, { Component } from "react";
import Facture from "./components/Facture";

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

//[{id:1,nb-tech :,date :'21/04/2019',heure_debut:'',heure_fin:'',bareme:20,techniciens :[{nom :'moh',nb-heur}]} ]


class App extends Component {

  

  render() {
    return (
      <div>
        <Facture tva={4} data={data} />
      </div>
    );
  }
}

export default App;
