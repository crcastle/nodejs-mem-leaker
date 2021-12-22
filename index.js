const http = require('http')

const leak = [];
let requestCount = 0;

const server = http.createServer((req, res) => {
    leak.push(new Array(1e6).fill("some string"))

    const used = process.memoryUsage();
    console.log(`Request ${requestCount} (since process started)`)
    requestCount++
    for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
    console.log('---')

    res.end('' + leak.length)
});

server.listen(3000)
console.log("Server listening to port 3000. Press Ctrl+C to stop it.")