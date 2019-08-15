// import React from "react";
// import PropTypes from "prop-types";
// import axios from "axios";
// // import "../../../Styles/EmojiResultsRow.css";

// export default class OverviewResultsRow extends React.Component {
//   // static propTypes = {
//   //   title: PropTypes.string,
//   //   symbol: PropTypes.string
//   // };

//   showReportCard() {
//     ("logged")
//     axios.get(`http://localhost:3030/api/person/${this.props.key}`)
//     .then(res => {
//       console.log(`report card for ${this.props.title}: `, res.data.data)
//     })
//   }

//   render() {
//     return (
//       <div
//         className="component-overview-result-row copy-to-clipboard"
//       >
//         <span className="title">
//           <div>
//             Name: {this.props.name}
//           </div>
//           <div>
//             Email: {this.props.email} 
//           </div>  
//           <div>
//             Phone: {this.props.phone}
//           </div>
//           <div>
//             Class: {this.props.class}
//           </div>
//           <button 
//             type="button"
//             onclick={this.showReportCard}
//           >Report Card</button>
//         </span>
//       </div>
//     );
//   }
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
