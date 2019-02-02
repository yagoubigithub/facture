import React, { Component } from 'react';
import Facture from './components/Facture';


const data = [
  {
    id : 0,
    nb_tech : 3,
    heure_debut : '08:15',
    heure_fin : '13:00',
    'date' : '27-01-2019',
    barème : 20,
    techniciens : [{
      nom : "yagoubi",
      prenom : "AEK",
      nb_heur : '2:30'
    },
    {
      nom : "Rahili",
      prenom : "AEK",
      nb_heur : '2:30'
    }, {
      nom : "Yagoubi",
      prenom : "AEK",
      nb_heur : '2:30'
     
    }]


  },
  {
    id : 1,
    nb_tech : 1,
    heure_debut : '08:15',
    heure_fin : '13:35',
    'date' : '27-01-2019',
    barème : 30,
    techniciens : [{
      nom : "Sedik",
      prenom : "Ilyes",
      nb_heur : '2:30'
    },
    {
      nom : "rahili",
      prenom : "abdelhadi",
      nb_heur : '2:30'
     
    }]


  }
 
  
];

//[{id:1,nb-tech :,date :'21/04/2019',heure_debut:'',heure_fin:'',bareme:20,techniciens :[{nom :'moh',nb-heur}]} ]

class App extends Component {
  render() {
    return (
      <div >
       <Facture tva={4} data={data} />
      </div>
    );
  }
}

export default App;
