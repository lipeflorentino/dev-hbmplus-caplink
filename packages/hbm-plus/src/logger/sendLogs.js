const path = require('path');
const fs = require('fs');

function sendLogs(req, res) {
    const logFilePath = path.join(__dirname, '../../', 'server.log');
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading log file');
        }
        res.send(`
        <html>
          <head>
            <title>Application Logs</title>
          </head>
          <body>
            <h1>Application Logs</h1>
            <pre>${data}</pre>
          </body>
        </html>
      `);
    });
}

module.exports = {
    sendLogs,
}
