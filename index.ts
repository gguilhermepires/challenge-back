const serverApp = require('./server');
require('dotenv').config();
const port = process.env.SERVER_PORT || 3000
serverApp.listen(port);
console.log(`\n\n Project started on port: ${port}`);
