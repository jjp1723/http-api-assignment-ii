// users Object - Empty upon the server starting/restarting
const users = {};

// respondJSON Method - Called by GET and POST requests; responds to requests with the status and json response
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

// addUser Method - Adds new entries to the 'users' object;
//  also updates existing entries or returns an error when required fields are not provided
const addUser = (request, response, body) => {
  const jsonResponse = { message: 'Name and age are both required.' };

  if (!body.name || !body.age) {
    jsonResponse.id = 'missingParams';
    return respondJSON(request, response, 400, jsonResponse);
  }

  let status = 204;

  if (!users[body.name]) {
    status = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (status === 201) {
    jsonResponse.message = 'Created Successfully';
    return respondJSON(request, response, status, jsonResponse);
  }

  return respondJSONMeta(request, response, status);
};

// getUsers Method - Returns the 'users' object and a status code 200 for a GET request
const getUsers = (request, response) => {
  const jsonResponse = { users };

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
  addUser,
  getUsers,
  getUsersMeta,
  notFound,
  notFoundMeta,
};
