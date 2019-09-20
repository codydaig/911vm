import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import apis from './../apis'
import SearchInput from './../components/SearchInput'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/';


const useStyles = makeStyles( theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: "100%"
  }
 }));

 const SimpleTable = (props) => {
   const classes = useStyles();
   return (
     <Paper className={classes.root}>
       <Table className={classes.table}>
         <TableHead>
           <TableRow>
             <TableCell>Name</TableCell>
             <TableCell>Email</TableCell>
             <TableCell>Phone</TableCell>
             <TableCell>Class</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {props.items.map(( item ) => (
             <TableRow key={item.id}>
               <TableCell>{`${item.first_name} ${item.last_name}`}</TableCell>
               <TableCell>{item.email_address}</TableCell>
               <TableCell>{item.phone_number}</TableCell>
               <TableCell>{item.class}</TableCell>
             </TableRow>
           ))

           }
         </TableBody>
       </Table>
     </Paper>
   )
 }

// TODO move this one to components
const VolunteerTable = (props) => {
  return (
    props.items.map((item) => {
      return (
        <li key={item.id}>
          <Link to={`/volunteers/${item.id}`}>{item.first_name}</Link>
        </li>
      )
    })
  )
}

const Volunteers = (props) => {
  const [volunteers, setVolunteers] = useState([]);
  const [text, setText] = useState('');
  const classes = useStyles();

  const getVolunteers = () => {
    apis.getVolunteers()
    .then((res) => {
      const data = res.data.data;
      setVolunteers(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getVolunteers();
  }, [])

  const handleChange = (event) => {
    const text = event.target.value;
    setText(text);
    
    apis.searchVolunteers(text)
    .then((res) => {
      const data = res.data.data;
      setVolunteers(data);
    })
    .catch((err) => {
      console.log(err);
    })    
  }

  return (
    <div>
      <div className={classes.wrapper}>
        <h1>911 Volunteer Management</h1>
        <SearchInput handleChange={handleChange} text={text}/>
      </div>
       
          <SimpleTable items={volunteers}></SimpleTable>
        
    </div>        
  )
}

export default Volunteers