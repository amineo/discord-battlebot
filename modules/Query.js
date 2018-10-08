const { execFile } = require('child_process');


class QStatQuery {

  constructor(params = {}){
    this.ip = params.ip || '208.100.45.121:28000';
    this.game = params.game || '-t2s';
    this.sortBy = params.sortBy || 'T';
  }

  run(cb){
     execFile('./qstat/qstat', [this.game, this.ip, '-P', '-R', '-json','-sort', this.sortBy], (error, stdout, stderr) => {
      if (error) return cb(error);
      cb(null, stdout);
    })
  }
}
module.exports = QStatQuery;
