import React, { Component } from "react";
import randomcolor from "randomcolor";
import withStyles from "@material-ui/core/styles";
import Print from "@material-ui/icons/Print";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";

import { ImportContacts, Close, Build, Group,ArrowUpward,ArrowDownward } from "@material-ui/icons";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  CircularProgress,
  ExpansionPanelDetails,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";

function printIt(table) {
  var win = window.open();
  //self.focus();
  win.document.open();
  win.document.write("<" + "html" + "><" + "body" + ">");
  win.document.write('<table style="width:100%;border : 1px solid"><tr>');
  win.document.write('<th style="border : 1px solid">Nombre Techniciens</th>');
  win.document.write('<th style="border : 1px solid">Heure Début</th>');
  win.document.write('<th style="border : 1px solid">Heure Fin  </th>');
  win.document.write('<th style="border : 1px solid">Date</th>');
  win.document.write('<th style="border : 1px solid">Tarif</th>');
  win.document.write('<th style="border : 1px solid">Prix</th>');

 
  win.document.write("</tr>");
  table.map(item => {
    win.document.write("<tr>");

    Object.keys(table[0]).map(key => {
      if (key !== "techniciens" && key !== "id" && key !== "consommable")
        win.document.write(
          '<td style="text-align : center;border :1px solid rgba(0,0,0,0.5)">' + item[key] + "</td>"
        );
    });

    win.document.write("</tr>");
  });

  win.document.write("<" + "/body" + "><" + "/html" + ">");
  win.document.close();
  win.print();
  win.close();
}
//[{id:1,nb-tech :,date :'21/04/2019',heure_debut:'',heure_fin:'',bareme:20,techniciens :[{nom :'moh',nb-heur}]} ]
class Facture extends Component {
  state = {
    htc: 0,
    ttc: 0,
    tva: 0,
    selectedValue: [],
    isSelectedAll: false,
    openDialogPrintItem: false,
    dialogTitle: "Liste des Techniciens",
    sortDirection : "desc",
    upDown : <ArrowUpward />,
    sortedLabele :  "date"
  };

  sortDate = (data) => {
    const a  = data.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    return a;
  }
 
  sortDicimal = (label) => {
    if(label === "tarif"){
      this.setState({sortedLabele :  "tarif"});
      if(this.state.sortDirection === "asc"){
        const d = [...this.state.data];
        const data = d.sort(function(a,b){
          return b["barème"] - a["barème"];
        });
        
        this.setState({data});
        this.setState({upDown : <ArrowUpward />});
        this.setState({sortDirection : "desc"});
      }else{
        const d = [...this.state.data];
        const data = d.sort(function(a,b){
          return b["barème"] - a["barème"];
        });
        data.reverse();
        this.setState({data});
        this.setState({upDown : <ArrowDownward />});
        this.setState({sortDirection : "asc"});
      }
    }else if(label === "prix"){
      this.setState({sortedLabele :  "prix"});
      if(this.state.sortDirection === "asc"){
        const d = [...this.state.data];
        const data = d.sort(function(a,b){
          return b["somme"] - a["somme"];
        });
        
        this.setState({data});
        this.setState({upDown : <ArrowUpward />});
        this.setState({sortDirection : "desc"});
      }else{
        const d = [...this.state.data];
        const data = d.sort(function(a,b){
          return b["somme"] - a["somme"];
        });
        
        data.reverse();
        this.setState({data});
        this.setState({upDown : <ArrowDownward />});
        this.setState({sortDirection : "asc"});
      }
    }else if (label === "heure_fin"){
      this.setState({sortedLabele :  "heure_fin"});
      if(this.state.sortDirection === "asc"){
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return new Date( '1970/01/01 ' +b.heure_fin) - new Date('1970/01/01 ' +a.heure_fin);
        });
        
        this.setState({data});
        this.setState({upDown : <ArrowUpward />});
        this.setState({sortDirection : "desc"});
      }else{
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return new Date( '1970/01/01 ' +b.heure_fin) - new Date('1970/01/01 ' +a.heure_fin);
        });
        data.reverse();
        this.setState({data});
        this.setState({upDown : <ArrowDownward />});
        this.setState({sortDirection : "asc"});
      } 
    }else if (label === "heure_debut"){
      this.setState({sortedLabele :  "heure_debut"});
      if(this.state.sortDirection === "asc"){
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return new Date( '1970/01/01 ' +b.heure_debut) - new Date('1970/01/01 ' +a.heure_debut);
        });
        
        this.setState({data});
        this.setState({upDown : <ArrowUpward />});
        this.setState({sortDirection : "desc"});
      }else{
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return new Date( '1970/01/01 ' +b.heure_debut) - new Date('1970/01/01 ' +a.heure_debut);
        });
        data.reverse();
        this.setState({data});
        this.setState({upDown : <ArrowDownward />});
        this.setState({sortDirection : "asc"});
      } 
    }//nb_tech


    else if (label === "nb_tech"){
      this.setState({sortedLabele :  "nb_tech"});
      if(this.state.sortDirection === "asc"){
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return b.nb_tech - a.nb_tech;
        });
        
        this.setState({data});
        this.setState({upDown : <ArrowUpward />});
        this.setState({sortDirection : "desc"});
      }else{
        const d = [...this.state.data];
        const data =  d.sort(function(a,b){
          return b.nb_tech - a.nb_tech;
        });
        data.reverse();
        this.setState({data});
        this.setState({upDown : <ArrowDownward />});
        this.setState({sortDirection : "asc"});
      }
    }

   
  }

  sortOnDate = () =>{
    this.setState({sortedLabele :  "date"})
    if(this.state.sortDirection === "asc"){
      const data = [...this.state.data];
      this.sortDate(data);
      this.setState({data});
      this.setState({upDown : <ArrowUpward />});
      this.setState({sortDirection : "desc"});
    }else{
      const data = [...this.state.data];
      
      data.reverse();
      this.setState({data});
      this.setState({upDown : <ArrowDownward />});
      this.setState({sortDirection : "asc"});
    }

  }

 
  componentWillMount = () => {
    const d = this.sortDate(this.props.data);
    

    for (let i = 0; i < d.length; i++) {
      this.setState({ [`checkboxSelected-${i}`]: false });
    }
    let totale = 0;
    const data = d.map(item => {
      item.nb_tech = item.techniciens.length;
      const mils_fin = Date.parse("July 21, 1983 " + item["heure_fin"]);
      const mils_debut = Date.parse("July 21, 1983 " + item["heure_debut"]);
      const somme = (
        (item["barème"] / 60 / 60 / 1000) *
        (mils_fin - mils_debut)
      ).toFixed(2);
      item.somme = somme;
      totale = totale + Number.parseFloat(somme);
      return item;
    });
    console.log(totale);
    this.setState({ totale });
    this.setState({ data });
  };

  checkboxChange = (index, item) => {
    if (!this.state[`checkboxSelected-${index}`]) {
      const selectedValue = [...this.state.selectedValue];
      if (selectedValue.indexOf(item) === -1) {
        selectedValue.push(item);
        this.setState({ selectedValue });
      }
    } else {
      const selectedValue = [...this.state.selectedValue];
      if (selectedValue.indexOf(item) !== -1) {
        selectedValue.splice(selectedValue.indexOf(item), 1);
        this.setState({ selectedValue });
      }
    }

    this.setState({
      [`checkboxSelected-${index}`]: !this.state[`checkboxSelected-${index}`]
    });
  };
  handelSelectedAll = () => {
    if (!this.state.isSelectedAll) {
      const selectedValue = [];
      this.state.data.map((item, index) => {
        selectedValue.push(item);
        this.setState({ [`checkboxSelected-${index}`]: true });
      });
      this.setState({ selectedValue });
    } else {
      this.state.data.map((item, index) => {
        this.setState({ [`checkboxSelected-${index}`]: false });
      });
      this.setState({ selectedValue: [] });
    }
    this.setState({ isSelectedAll: !this.state.isSelectedAll });
  };

  openDialogPrintItemFunc = () => {
    this.setState({ openDialogPrintItem: true });
  };
  handleCloseDialogPrintItem = () => {
    this.setState({ openDialogPrintItem: !this.state.openDialogPrintItem });
  };
  calculTemps = (tempsDebut, tempsFin) => {
    const timePartsDebut = tempsDebut.split(":");
    const timePartsFin = tempsFin.split(":");
    console.log(timePartsDebut, timePartsFin);
    const time =
      Number.parseInt(timePartsFin[0]) * 60000 * 60 +
      Number.parseInt(timePartsFin[1]) * 60000 -
      (Number.parseInt(timePartsDebut[0]) * 60000 * 60 +
        Number.parseInt(timePartsDebut[1]) * 60000);
    const hour = Math.floor(time / 1000 / 60 / 60);
    const min = Math.floor((time % (1000 * 60 * 60)) / 1000 / 60);
    return hour + ":" + min;
  };
  showItem = items => {
    const myItems = items;
    this.setState({ myItems });
    const dialogContentPrintItem = [];
    this.setState({ dialogTitle: "Liste des Techniciens" });
    items.map((item, index) => {
      dialogContentPrintItem.push(<hr />);
      dialogContentPrintItem.push(<Typography variant="subheading" key ={index}>Déplacement  de date : {item.date}</Typography>)
      
      //   for (let i = 0; i < item.nb_tech; i++) {
      dialogContentPrintItem.push(
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Prénom</TableCell>
              <TableCell align="right">Date de déplacement</TableCell>
              <TableCell align="right">Heure de début du déplacement</TableCell>
              <TableCell align="right">Heure de fin du déplacement</TableCell>

              <TableCell align="right">Temps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.techniciens.map((row, index) => (
              <TableRow  key={"techniciens" + index}>
                <TableCell component="th" scope="row">
                  {row.nom}
                </TableCell>
                <TableCell align="right">{row.prenom}</TableCell>

                <TableCell align="right">{item.date}</TableCell>
                <TableCell align="right">{item.heure_debut}</TableCell>
                <TableCell align="right">{item.heure_fin}</TableCell>

                <TableCell align="right">{row.nb_heur}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        /*
        <ExpansionPanel
          key={i + "ExpansionPanel" + item.nb_tech}
          style={{ minWidth: 500 }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">
              {item.techniciens[i].nom + " " + item.techniciens[i].prenom}{" "}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography variant="body2">
              Nom :{item.techniciens[i].nom}
              <br />
              Prénom :{item.techniciens[i].prenom}
              <br />
              Date de déplacement :{item.date}
              <br />
              Temps de debut du déplacement :{item.heure_debut}
              <br />
              Temps de fin du déplacement :{item.heure_fin}
              <br />
              Temps de déplacement :
              {item.techniciens[i].nb_heur}
              <br />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>*/
      );
      //}
    });

    this.setState({ dialogContentPrintItem });
    this.openDialogPrintItemFunc();
  };
  showMultiItem = (list) => {
    if(list === "Techniciens")
    this.showItem(this.state.selectedValue);
    else{
      this.showResource(this.state.selectedValue);
    }
  };

  showResource = items => {
    const myItems = items;
    this.setState({ myItems });
    this.setState({ dialogTitle: "Liste des Ressource" });
    const dialogContentPrintItem = [];
    
    let totalCout = 0;
    items.map((item,index) => {
      dialogContentPrintItem.push(<hr />);
      dialogContentPrintItem.push(<Typography variant="subheading" key ={index}>Déplacement  de date : {item.date}</Typography>)
      dialogContentPrintItem.push(
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Article</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Coût</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.consommable.map((row, index) => {
              totalCout += row.qte * row.cout;
              return (
                <TableRow key={"consommable" + index}>
                  <TableCell component="th" scope="row">
                    {row.article}
                  </TableCell>
                  <TableCell align="right">{row.qte}</TableCell>
                  <TableCell align="right">{row.cout} €</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
     
    });
    dialogContentPrintItem.push(
      <div>
        <br />
        <hr />
        <Typography variant="title">Totale : {totalCout} €</Typography>
      </div>
    );
    this.setState({ dialogContentPrintItem });
    this.openDialogPrintItemFunc();
  };
  Imprission = () => {
    printIt(this.props.data);
    console.log(this.props.data);
    //window.print();
  };
  printItem = () => {
    printIt(this.state.myItems);
  };
  render() {
    const keys = Object.keys(this.state.data[0]);
    return (
      <React.Fragment>
        <AppBar
          position="static"
          style={{ backgroundColor: "#000" }}
          color="primary"
        >
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Facture
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <form>
              {this.state.selectedValue.length > 0 ? (
                <Button color="inherit" onClick={()=>this.showMultiItem("Techniciens")}>
                  <Typography
                    color="inherit"
                    variant="caption"
                    style={{ margin: 2 }}
                  >
                    Afficher Liste des Techniciens
                  </Typography>
                  <Group />
                </Button>
              ) : null}
              {this.state.selectedValue.length > 0 ? (
                <Button color="inherit" onClick={()=>this.showMultiItem("Ressource")}>
                  <Typography
                    color="inherit"
                    variant="caption"
                    style={{ margin: 2 }}
                  >
                    Afficher Liste des Ressource
                  </Typography>
                  <Group />
                </Button>
              ) : null}
              <Button color="inherit" id="print-btn" onClick={this.Imprission}>
                <Typography
                  color="inherit"
                  variant="caption"
                  style={{ margin: 2 }}
                >
                  Imprimer tout
                </Typography>
                <Print />
              </Button>
            </form>
          </Toolbar>
        </AppBar>
        <br />

        <div id="facture" style={{ padding: 10 }}>
          <Paper>
            <Table>
              <TableHead style={{ backgroundColor: "#000" }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      style={{ backgroundColor: "#FFF" }}
                      onChange={this.handelSelectedAll}
                      checked={this.state.isSelectedAll}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6" onClick={()=>this.sortDicimal("nb_tech")}>
                      Nombre Techniciens
                      {this.state.sortedLabele === "nb_tech" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6" onClick={()=>this.sortDicimal("heure_debut")}>
                      Heure Début
                      {this.state.sortedLabele === "heure_debut" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6" onClick={()=>this.sortDicimal("heure_fin")}>
                      Heure Fin
                      {this.state.sortedLabele === "heure_fin" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6" onClick={this.sortOnDate}>
                      Date
                      {this.state.sortedLabele === "date" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                    
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6"  onClick={()=>this.sortDicimal("tarif")}>
                      Tarif
                      {this.state.sortedLabele === "tarif" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ color: "white" }} variant="h6" onClick={()=>this.sortDicimal("prix")}>
                      Prix
                      {this.state.sortedLabele === "prix" ?<IconButton color="inherit" >
                      {this.state.upDown}
                    </IconButton>: null}
                    </Typography>
                  </TableCell>

                  <TableCell padding="checkbox"> </TableCell>
                  <TableCell padding="checkbox"> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.data.map((item, index) => {
                  const table = (
                    <TableRow
                      style={{
                        backgroundColor: index % 2 !== 0 ? "#F2F2F2" : "#FFF"
                      }}
                      key={`row-${index}`}
                    >
                      <TableCell key={`checkbox-${index}`} padding="checkbox">
                        <Checkbox
                          checked={this.state[`checkboxSelected-${index}`]}
                          onChange={() => this.checkboxChange(index, item)}
                        />
                      </TableCell>

                      <TableCell >
                        {item["nb_tech"]}
                      </TableCell>
                      <TableCell >
                        {item["heure_debut"]}
                      </TableCell>
                      <TableCell >
                        {item["heure_fin"]}
                      </TableCell>
                      <TableCell >
                        {item["date"]}
                      </TableCell>
                      <TableCell >
                        {item["barème"]}
                      </TableCell>
                      <TableCell >
                        {item["somme"]}
                      </TableCell>


                      <TableCell
                        key={`showResource-${index}`}
                        padding="checkbox"
                      >
                        <IconButton onClick={() => this.showResource([item])}>
                          <Build />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        key={`afficher_details-${index}`}
                        padding="checkbox"
                      >
                        <IconButton onClick={() => this.showItem([item])}>
                          <Group />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                  return table;
                })}
              </TableBody>
            </Table>
          </Paper>

          <div dir="rtl">
            <div
              style={{
                maxWidth: 250,
                backgroundColor: "#F2F2F2",
                display: "flex",
                flexDirection: "column",
                marginTop : 10,
                padding : 5,
                boxShadow : "1px 1px 4px rgba(0,0,0,0.4)"

              }}
            >
              <Typography variant="h6"  dir="ltr">
                Montant HT : {this.state.totale} €
              </Typography>
              
              <Typography variant="h6"   dir="ltr">
                Montant TTC :{" "}
                {(
                  this.state.totale +
                  this.state.totale * (this.props.tva / 100)
                ).toFixed(2)}{" "}
                €
              </Typography>
              
              <Typography variant="h6" dir="ltr">
                Montant TVA :{" "}
                {(this.state.totale * (this.props.tva / 100)).toFixed(2)} €
              </Typography>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.openDialogPrintItem}
          onClose={this.handleCloseDialogPrintItem}
          maxWidth="xl"
        >
          <DialogTitle
            style={{ padding: 0, marginBottom: 8, backgroundColor: "#F2F2F2" }}
            onClose={this.handleCloseDialogPrintItem}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" style={{ margin: 8 }}>
                {this.state.dialogTitle}
              </Typography>
              <IconButton onClick={this.handleCloseDialogPrintItem}>
                <Close />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            {this.state.dialogContentPrintItem ? (
              this.state.dialogContentPrintItem
            ) : (
              <CircularProgress />
            )}
          </DialogContent>
          <DialogActions>
            <div dir="rtl">
              <IconButton onClick={this.printItem}>
                <Print />
              </IconButton>
            </div>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Facture;
