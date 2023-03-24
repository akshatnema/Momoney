const NodeCache = require("node-cache");

const cache = new NodeCache();

module.exports = duration => (req, res, next) => {
    if(req.method !== 'GET'){
        console.log('cannot cache non get method')
        return next();
    }
    const key = req.url;
    const cachedResponse =cache.get(key);
    if(cachedResponse) {
        console.log('cache hit');
        res.send(cachedResponse);
    } else {
        res.originalSend = res.send;
        res.send= body => {
            console.log('cache missed');
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
}