import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const domElement = document.createElement('div');
domElement.setAttribute("id", "app");
document.body.appendChild(domElement);
var head = document.getElementsByTagName("HEAD")[0];

// Create new link elements
var datepicker = document.createElement("link");
datepicker.rel = "stylesheet";
datepicker.href = "/style/datepicker.css";

var form = document.createElement("link");
form.rel = "stylesheet";
form.href = "/style/form.css";

var reportCard = document.createElement("link");
reportCard.rel = "stylesheet";
reportCard.href = "/style/reportcard.css";

// Append link elements to HTML head
head.appendChild(datepicker);
head.appendChild(form);
head.appendChild(reportCard)

ReactDOM.render(<App />, document.getElementById('app'));
