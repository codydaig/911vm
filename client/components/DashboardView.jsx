import React, {useState, useEffect} from 'react';
import apis from './../apis'
import Dashboard from './Dashboard.jsx';
import { sign } from 'crypto';

const DashboardView = () => {
  const [signOffs, setSignOffs] = useState({headers: [], body: []});

  useEffect(() => {
    apis.getDashboardData()
    .then((res) => {
      const data = res.data.data;
      setSignOffs(data)
      console.log(data)  
    })
  }, [])

  return (
    <Dashboard signOffHeaders={signOffs.headers} signOffBody={signOffs.body}/>
  )
}

export default DashboardView;