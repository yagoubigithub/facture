import React, { Component } from "react";
import ReactTable from "react-table";
import randomcolor from "randomcolor";


import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel, Divider } from "@material-ui/core";

//CSS
import "react-table/react-table.css";


function printIt(table) {
  var win = window.open();
  //self.focus();
  win.document.open();
  win.document.write('<'+'html'+'><'+'body'+'>');
  win.document.write('<table style="width:100%;border : 1px solid"><tr>');
  Object.keys(table[0]).map(key =>{
    win.document.write('<th style="border : 1px solid">' + key  + '</th>');
  });
  win.document.write('</tr>');
  table.map(item => {
    win.document.write('<tr>');

    Object.keys(table[0]).map(key =>{
      win.document.write('<td style="text-align : center">' + item[key].props.children  + '</td>');
    });


    win.document.write('</tr>');
  });
  
  win.document.write('<'+'/body'+'><'+'/html'+'>');
  win.document.close();
  win.print();
  win.close();
}
//[{id:1,nb-tech :,date :'21/04/2019',heure_debut:'',heure_fin:'',bareme:20,techniciens :[{nom :'moh',nb-heur}]} ]
class Facture extends Component {
  state = {
      htc : 0,
      ttc : 0,
      tva :0
  };
  //rt-td
  componentWillMount = () => {
    const columns = Object.keys(this.props.data[0]).map(item => {
      return {
        Header: item,
        accessor: item
        
      };
    });
    columns.push({ Header: "somme", accessor: "somme" 
    });

    const data = [];
    
    
    let htc = 0;
    let ttc = 0;
    let tva = 0;
    let sommes =[];
    
    this.props.data.map(item => {
      const color = randomcolor({
        luminosity: "light"
      });
      const mils_fin = Date.parse("July 21, 1983 " + item["heure_fin"]);
      const mils_debut = Date.parse("July 21, 1983 " + item["heure_debut"]);
      const somme = ((item["barème"] / 60 / 60 / 1000) * (mils_fin - mils_debut)).toFixed(2);

      item.somme = (
        <div className="cell-rt-td" style={{ backgroundColor: color }}>
          {somme}
        </div>
      );
      
      Object.keys(this.props.data[0]).map(i => {
        if(i  !== "somme"){
          item[i] = 
          (
            <div className="cell-rt-td" style={{ backgroundColor: color }}>
              {item[i]}
            </div>
          );
        }
        
      });
     

  
      data.push(item);
    });
    data.map(item =>{
      item[" - "] = ( <FormControlLabel
           
        control={<Checkbox
         value={item.id} 
         checked={false}
        
       // onChange={(event)=>this.handleChange(event,[`checkbox${index}`])}
        />}
        label={item.id}
      />);
    });
   
    console.log(sommes);
    htc = sommes.reduce((accumulator, currentValue) => 
    Number.parseFloat(accumulator) + Number.parseFloat(currentValue),0);
     tva = (htc * (this.props.tva / 100 )).toFixed(2);
    
    ttc =  htc + Number.parseFloat(tva) + 0.00000000001;
    ttc = ttc.toFixed(2);
    
     
    this.setState({htc});
    this.setState({ttc});
    this.setState({tva});
    this.setState({ columns });
    this.setState({ data });
  };
componentDidMount(){
    window.addEventListener("beforeprint", function(event) { 
        document.getElementById("print-btn").style.display = 'none';
     });
     window.addEventListener("afterprint", function(event) { 
        document.getElementById("print-btn").style.display = 'inline-block';
      });
}
  Imprission = () => {
     printIt(this.props.data); 
     console.log(this.props.data)
   //window.print();
  };
  render() {
    return (
      <React.Fragment>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .rt-table{ overflow: visible !important;}

      .rt-td { padding: 0 !important }
      .cell-rt-td{padding : 10px 0px;text-align :center}
      .ttc-htc{padding : 10px 5px;font-weight : 500;margin :5px}
      #facture{ margin : 15px;box-shadow : 0 0 4px black;}
     
    `
          }}
        />

        <form>
          <IconButton id="print-btn" onClick={this.Imprission}>
            <Print />
          </IconButton>

        </form>
        <div id="facture">
        <ReactTable
          columns={this.state.columns}
          data={this.state.data}
          showPagination={false}
          resizable={false}
          minRows={1}
          defaultPageSize = {this.props.data.length}
          sortable={false}
          
         
        />
        <div dir="rtl">
        <span className="ttc-htc" dir="ltr">Montant HT : {this.state.htc} £</span><br />
          <span className="ttc-htc" dir="ltr">Montant TTC  : {this.state.ttc}  £</span><br />
          <span className="ttc-htc" dir="ltr">Montant TVA  : {this.state.tva}  £</span>
          
        </div>
        </div>
        
       
      </React.Fragment>
    );
  }
}

export default Facture;

