import SocketCluster from 'socketcluster';

const socketCluster = new SocketCluster.SocketCluster({
  worker: 10000,
  port: 3000,
  appName: 'Datalytics',
  workerController: __dirname + '/worker.js',
  socketChannelLimit: 1000,
  rebootWorkerOnCrash: true,
});

export default socketCluster;
