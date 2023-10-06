// tanks Object - Empty upon the server starting/restarting
const tanks = {};

// respondJSON Method - Called by GET and POST requests;
//  responds to requests with the status and json response
const respondJSON = (request, response, status, object) => {
  const header = { 'Content-Type': 'application/json' };

  response.writeHead(status, header);
  response.write(JSON.stringify(object));
  response.end();
};

// respondJSONMeta Method - Called by HEAD requests; responds to requests with the status
const respondJSONMeta = (request, response, status) => {
  const header = { 'Content-Type': 'application/json' };

  response.writeHead(status, header);
  response.end();
};

// addTank Method - Adds new entries to the 'tanks' object;
//  also updates existing entries or returns an error when required fields are not provided
const addTank = (request, response, body) => {
  const jsonResponse = { message: 'Name and age are both required.' };

  if (!body.name || !body.nation || !body.year || !body.produced) {
    jsonResponse.id = 'missingParams';
    return respondJSON(request, response, 400, jsonResponse);
  }

  let status = 204;

  if (!tanks[body.name]) {
    status = 201;
    tanks[body.name] = {};
  }

  tanks[body.name].name = body.name;
  tanks[body.name].nation = body.nation;
  tanks[body.name].year = body.year;
  tanks[body.name].produced = body.produced;

  if (!body.description) {
    tanks[body.name].description = `The ${body.name} was a tank designed in ${body.nation} in the year ${body.year}, with ${body.produced} models produced.`;
  } else {
    tanks[body.name].description = body.description;
  }

  if(!body.image){
    tanks[body.name].image = 'https://cdn-icons-png.flaticon.com/512/8206/8206245.png';
  }else{
    tanks[body.name].image = body.image;
  }

  if (status === 201) {
    jsonResponse.message = 'Created Successfully';
    return respondJSON(request, response, status, jsonResponse);
  }

  return respondJSONMeta(request, response, status);
};

// getUsers Method - Returns the 'users' object and a status code 200 for a GET request
const getTanks = (request, response) => {
  const jsonResponse = { users: tanks };

  return respondJSON(request, response, 200, jsonResponse);
};

// getUsersMeta Method - Returns a status code 200 for a HEAD request
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// notFound Method - Returns a message and status code 404 for a GET request
const notFound = (request, response) => {
  const jsonResponse = { message: 'The page you are looking for was not found', id: 'notFound' };

  return respondJSON(request, response, 404, jsonResponse);
};

// notFoundMeta Method - Returns a status code 404 for a HEAD request
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// Exporting Methods
module.exports = {
  addTank,
  getTanks,
  getUsersMeta,
  notFound,
  notFoundMeta,
};
