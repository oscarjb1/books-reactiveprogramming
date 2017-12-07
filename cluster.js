var cluster = require('cluster');

if(cluster.isMaster){
  console.log("ENV ==> " , process.env.NODE_ENV)
  require('os').cpus().forEach(function(){
    startWorker()
  });

  cluster.on('disconnect', function(worker){
      console.log(
        'CLUSTER: Worker %d disconnected from the cluster.', worker.id)
  });

  cluster.on('exit', function(worker, code, signal){
      console.log(
        'CLUSTER: Worker %d died with exit code %d (%s)',
        worker.id, code, signal);
      startWorker()
  });

} else {
    require('./server.js')()
}

function startWorker() {
  var worker = cluster.fork()
  console.log('CLUSTER: Worker %d started', worker.id)
}
