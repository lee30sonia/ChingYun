var local = 0; 
var URL;

if (local)
    URL = "http://localhost:4001"
else
    URL = "https://chingyun-server.now.sh"

module.exports = URL;