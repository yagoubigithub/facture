import React, { Component } from 'react';
import Facture from './components/Facture';


const data = [
  {
    id : 0,
    heure_debut : '08:15',
    heure_fin : '13:00',
    'date' : '27-01-2019',
    barème : 20,
    tech : 'Mohamed',
    teche : 'Mohamed',


  },
  {
    id : 1,
    heure_debut : '08:00',
    heure_fin : '17:00',
    'date' : '27-01-2019',
    barème : 15,
    tech : 'Ali',
    teche : 'Mohamed',

  }
  ,
  {
    id : 1,
    heure_debut : '11:00',
    heure_fin : '17:10',
    barème : 15,
    'date' : '27-01-2019',
    tech : 'Omar',
    
    teche : 'Mohamed',
  }
  ,
  {
    id : 1,
    heure_debut : '11:00',
    heure_fin : '17:10',
    'date' : '27-01-2019',
    barème : 15,
    tech : 'Omar',
    teche : 'Mohamed',

  }
  ,
  {
    id : 1,
    heure_debut : '11:00',
    heure_fin : '17:10',
    'date' : '27-01-2019',
    barème : 15,
    tech : 'Omar',
    teche : 'Mohamed',

  },
  {
    id : 0,
    heure_debut : '08:15',
    heure_fin : '13:10',
    'date' : '27-01-2019',
    barème : 20,
    tech : 'Mohamed',
    teche : 'Mohamed',

  },
  {
    id : 1,
    heure_debut : '08:00',
    heure_fin : '17:00',
    'date' : '27-01-2019',
    barème : 15,
    tech : 'Ali',
    teche : 'Mohamed',

  }
  ,
  {
    id : 1,
    heure_debut : '11:00',
    heure_fin : '17:10',
    'date' : '27-01-2019',
    barème : 15,
    tech : 'Omar',
    teche : 'Mohamed',

  }
  ,
  {
    id : 1,
    heure_debut : '11:00',
    heure_fin : '17:10',
    'date' : '27-01-2019',
    
    barème : 15,
    tech : 'Omar',
    teche : 'Mohamed',

  }
 
  
];

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
