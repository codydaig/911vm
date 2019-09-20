import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  }
}));


const SearchInput = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for volunteer"
        inputProps={{ 'aria-label': 'search for volunteer' }}
        onChange={props.handleChange}
        value={props.text}
      />
    </Paper>
  )
}

export default SearchInput