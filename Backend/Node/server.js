/* Express Server Boilerplate
 * Pros:
 *  - Middleware design pattern
 * Cons:
 *  - Runtime enviornment V8 engine:
 *    - Its relativly huge and in turn runs a lot slower. Do you need speed? Stop being lazy and use something else.
 *    - Single-Threaded prefernce makes it cumbersome for multi-threading use
 * 
 * Debug Reminders!:
 * - Route handlers come after default GET request
 * 
 * CODE:
 * ------------------------------------------------------------------
  const express = require('express');
  const PORT = 3000;
  //Initializes http server
  const server = express();
  //TODO: Give goood description of what this line does
  server.use(express.json());
  // Give directory location containing all static files needed on frontend 
  server.use('/', express.static(path.join(__dirname, '{PATH_TO_DIR_CONTAINING_FRONTEND_FILES}')));
  // Handle default GET request
  server.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '{PATH_TO_INDEX.HTML}')));
  // Global middleware error handler 
  server.use((err, req, res, next) => {
   const defaultErr = {
     log: '{ERROR_DESCRIPTION_AND_LOCATION}',
     status: 500,
     message: { err: 'A server side error occured handling request'}
   };
   const errorObj = Object.assign({}, defaultErr, err);
   console.log(errorObj.log);
   return res.status(errorObj.status).json(errorObj.message);
  });
  server.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
 * ------------------------------------------------------------------
 */
const express = require('express');
const path = require('path');
const PORT = 3000;
const server = express();

server.use(express.json());
server.use('/', express.static(path.join(__dirname, '../../Frontend/dist')));
server.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../Frontend/dist/index.html')));

/*Global Middleware Error Handler Boilerplate
 * Use default error obj for ease of use when handling errors in middleware
 * Console logs error and sends error response back to client
 * CODE:
 * -----------------------------------------------------------
 * server.use((err, req, res, next) => {
 *   const defaultErr = {
 *     log: '{ERROR_DESCRIPTION_AND_LOCATION}',
 *     status: 500,
 *     message: { err: '{CUSTOM_MESSAGE_SENT_TO_CLIENT}' },
 *   };
 *   const errorObj = Object.assign({}, defaultErr, err);
 *   console.log(errorObj.log);
 *   return res.status(errorObj.status).json(errorObj.message);
 * });
 * ------------------------------------------------------------
 */
// Global middleware error handler 
server.use((err, req, res, next) => {
  const defaultErr = {
    log: '{ERROR_DESCRIPTION_AND_LOCATION}',
    status: 500,
    message: { err: 'A server side error occured handling request'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(PORT, () => console.log(`Started server listening on port: ${PORT}`));
