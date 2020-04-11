const http = require('http');
const fs = require('fs');

const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const cache_prefix = process.env.CACHE_DIR || 'cache/'

const db_update = require('better-sqlite3')('update.db');

const server = http.createServer((req, res) => {
	var headers = req.headers['user-agent'].split('-');
	if (headers[0] === 'Edopro' && 
		(headers[1] === 'Windows' || headers[1] === 'Mac' || headers[1] === 'Linux') &&
		headers[2].split('.').every(function(val) {
			return Number.isInteger(parseInt(val));
		})
		)
	{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		const version = headers[2].split('.').map(v => parseInt(v)).join('.');
		const filename = cache_prefix.concat(headers[1]).concat('/').concat(version).concat('.json');
		fs.readFile(filename, 'utf-8', (err, fd) => {
		  if (err) {
		    if (err.code === 'ENOENT') {
		      const sql = db_update.prepare("SELECT (major || '.' || minor || '.' || patch) as name, hash as md5, url FROM urls WHERE name > ? AND os = ? ORDER BY name ASC");
		      const result = JSON.stringify(sql.all(headers[2], headers[1]));
		      fs.writeFile(filename, result, (err) => { if(err) console.log(err) });
		      res.write(result);
		      res.end();
		    }
		  } else {
		  	res.write(fd.toString())
		  	res.end();
		  }
		});
	} else {
		res.statusCode = 401;
		res.setHeader('Content-Type', 'type/text');
		res.end('Permission Denied');
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});