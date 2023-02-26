const {parentPort} = require('worker_threads');

parentPort.on("message",(result)=>{
    parentPort.postMessage(result);
})