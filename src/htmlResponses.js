const fs = require('fs');

// References to 'client.html' and 'style.css' files in the local directory
const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// getClient Method - Returns any requests to 'client.html'
const getClient = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client);
  response.end();
};

// getCSS Method - Returns any requests to 'style.css'
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Exporting Methods
module.exports = {
  getClient,
  getCSS,
};
