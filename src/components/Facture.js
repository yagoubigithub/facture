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
import AppBar from '@material-ui/core/AppBar';

import { ImportContacts, Close } from "@material-ui/icons";
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
  Object.keys(table[0]).map(key => {
    if(key !== "techniciens")
    win.document.write('<th style="border : 1px solid">' + key + "</th>");
  });
  win.document.write("</tr>");
  table.map(item => {
    win.document.write("<tr>");

    Object.keys(table[0]).map(key => {
      if(key !== "techniciens")
      win.document.write(
        '<td style="text-align : center">' + item[key] + "</td>"
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
    openDialogPrintItem: false
  };

  componentWillMount = () => {
    const d = this.props.data;
    for (let i = 0; i < d.length; i++) {
      this.setState({ [`checkboxSelected-${i}`]: false });
    }
    let totale = 0;
    const data = d.map(item => {
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
    const colors = [];
    for (let i = 0; i < data.length; i++) {
      colors.push(
        randomcolor({
          luminosity: "light"
        })
      );
    }
    this.setState({ colors });
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
  showItem = (items) => {
    const myItems = items;
    this.setState({myItems});
    const dialogContentPrintItem = [];
    items.map(item =>{
       for (let i = 0; i < item.nb_tech; i++) {
      dialogContentPrintItem.push(
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
        </ExpansionPanel>
      );
    }
    });
   
    
    this.setState({ dialogContentPrintItem });
    this.openDialogPrintItemFunc();
  };
  showMultiItem = () =>{
    this.showItem(this.state.selectedValue);
  }

  Imprission = () => {
    printIt(this.props.data);
    console.log(this.props.data);
    //window.print();
  };
  printItem = () => {
    printIt(this.state.myItems);
  }
  render() {
    const keys = Object.keys(this.state.data[0]);
    return (
      <React.Fragment>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Facture
          </Typography>
          <div style={{flexGrow : 1}}/>
          <form>
          {this.state.selectedValue.length > 0 ? (
            <Button color="inherit"onClick={this.showMultiItem}>
              
              <Typography color="inherit" variant="caption" style={{margin : 2}}>Afficher les détails</Typography>
            <ImportContacts />
            </Button>
          ) : null}
          <Button color="inherit" id="print-btn" onClick={this.Imprission}>
            
            <Typography color="inherit" variant="caption" style={{margin : 2}}>Imprimer tout</Typography>
            <Print />
          </Button>
          
        </form>
        </Toolbar>
      </AppBar>
      <br />
       
        <div id="facture">
          <Paper>
            <Table>
              <TableHead style={{ backgroundColor: "#F2F2F2" }}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      onChange={this.handelSelectedAll}
                      checked={this.state.isSelectedAll}
                    />
                  </TableCell>
                  {keys.map(key => {
                    if (key !== "techniciens")
                      return (
                        <TableCell key={key}>
                          <Typography variant="h6">{key}</Typography>
                        </TableCell>
                      );
                  })}
                  <TableCell key="montrer_details" padding="checkbox">
                    {" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.data.map((item, index) => {
                  const table = (
                    <TableRow
                      style={{ backgroundColor: this.state.colors[index] }}
                      key={`row-${index}`}
                    >
                      <TableCell key={`checkbox-${index}`} padding="checkbox">
                        <Checkbox
                          checked={this.state[`checkboxSelected-${index}`]}
                          onChange={() => this.checkboxChange(index, item)}
                        />
                      </TableCell>
                      {keys.map((key, index) => {
                        if (key !== "techniciens")
                          return (
                            <TableCell key={`${item[key]}-${index}`}>
                              {item[key]}
                            </TableCell>
                          );
                      })}

                      <TableCell
                        key={`montrer_details-${index}`}
                        padding="checkbox"
                      >
                        <IconButton onClick={() => this.showItem([item])}>
                          <ImportContacts />
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
            <span className="ttc-htc" dir="ltr">
              Montant HT :{" "}
              {this.state.totale } £
            </span>
            <br />
            <span className="ttc-htc" dir="ltr">
              Montant TTC : {(this.state.totale  + (this.state.totale * (this.props.tva / 100 ))).toFixed(2)} £
            </span>
            <br />
            <span className="ttc-htc" dir="ltr">
              Montant TVA : {(this.state.totale * (this.props.tva / 100 )).toFixed(2)} £
            </span>
          </div>
        </div>

        <Dialog
          open={this.state.openDialogPrintItem}
          onClose={this.handleCloseDialogPrintItem}
        >
          <DialogTitle
            style={{ padding: 0, marginBottom: 8 ,backgroundColor : "#F2F2F2"}}
            onClose={this.handleCloseDialogPrintItem}
          >
            <div style={{display : 'flex',justifyContent: 'space-between'}}>
            <Typography variant="h5" style={{margin : 8}}>List des Techniciens</Typography>
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
