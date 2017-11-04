const QStatQuery = require('./Query.js');

// Future `t2` command enhancement
// master.tribesnext.com/list/classic 

class QueryList {
    constructor(serverlist) {
        this.serverlist = serverlist;
    }

    queryServer(server) {
        console.log(`Async Query ${server.ip} started`);
        return new Promise(resolve => {
            new QStatQuery(server).run(function (err, data) {
                if (err) throw err;               
                let result = JSON.parse(data)[0];
                // return command name in data object
                result["command"] = server.command;
                resolve(result);
            });
        });
    }


    async queryList() {
        let serverInfo = [];
        for (var server of this.serverlist) {
            serverInfo.push(await this.queryServer(server));
        }
        let lookupDate = new Date();
        console.log(`Query que completed: ${lookupDate}`);
        return serverInfo;
    }

}
module.exports = QueryList;