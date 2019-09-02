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

export default function SimpleTable(props) {
  const classes = useStyles();

  return (
    <Paper className = {classes.root}>
      <Table className = {classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.searchedData.map(row => (
            <TableRow
              key={row.id}
              onClick={() => { props.selectOneVolunteer(row) }}
              hover
            >
              <TableCell component="th" scope="row">
                {`${row["first_name"]} ${row["last_name"]}`}
              </TableCell>
              <TableCell align="right">{row["email_address"]}</TableCell>
              <TableCell align="right">{row["phone_number"]}</TableCell>
              <TableCell align="right">{row.class}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
