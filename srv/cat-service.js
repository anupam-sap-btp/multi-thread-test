const cds = require('@sap/cds');
const { Worker } = require('worker_threads');


module.exports = cds.service.impl(async function (srv) {
    srv.on('testGeneric', async (req) => {
        const start = new Date();
        let end;
        let promise = [];

        for (let i = 0; i < 3; i++) {
            promise.push(await testWait(i, 3));
        }

        await Promise.all(promise).then(response => {
            end = new Date();
            console.log('Execution time>>>', (end - start) / 1000);
        });
        console.log("Execution Done");
        const dur = (end - start) / 1000;
        return ("Execution Done in seconds>>" + dur)
    });

    srv.on('testWithThread', async (req) => {
        const start = new Date();
        let end;
        let promise = [];
        for (let i = 0; i < 3; i++) {
            const worker = new Worker(__dirname + "/thread.js");
            worker.postMessage('dummy');

            promise.push(
                new Promise((resolve, reject) => {
                    worker.on('message', async () => {
                        let result = await testWait(i, 3);
                        let obj = { threadId: worker.threadId, res: result }
                        resolve(obj);
                    })

                    worker.on('error', (err) => { reject(err); })
                    worker.on('exit', () => { })
                })
            );
        }
        await Promise.all(promise).then(response => {
            end = new Date();
            console.log('Execution time>>>', (end - start) / 1000);
        });
        console.log("Execution Done");
        const dur = (end - start) / 1000;
        return ("Execution Done in seconds>>" + dur)
    });

    async function testWait(set, count) {
        let promiseSet = [];
        for (let i = 0; i < count; i++)
            promiseSet.push(await new Promise(r => setTimeout(r, 1000)));
        console.log(new Date(), '<<<Set ', set);
    }

});
