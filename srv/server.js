import path from 'node:path';
import { fileURLToPath } from 'node:url';
import "dotenv/config"
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("PATH: ",path.join(__dirname, 'public'))
const fastify = Fastify({
  logger: true
});

//-------------------------------------------
const port = process.env.PORT;
const host = process.env.HOST;

console.log("HOST: ",host,":",port)
//-------------------------------------------

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', 
  redirect: true,
  wildcard: false,
  //index: "index.html",
  list: { //------------------  http://localhost:3000/public ------------------------>
    format: 'json',
    jsonFormat: 'extended',
    render: (dirs, files) => {
       const dir = dirs[0];
      dir.fileCount // number of files in this folder
      dir.totalFileCount // number of files in this folder (recursive)
      dir.folderCount // number of folders in this folder
      dir.totalFolderCount // number of folders in this folder (recursive)
    },
  }
});
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public/models'),
  prefix: '/public/',
  redirect: true,
  wildcard: false,
  decorateReply: false,
});

//------------------  http://localhost:3000 ------------------------>
fastify.get('/', (request, reply) => {
  reply.sendFile('index.html');
});


const start = async () => {
    fastify.listen({ port: port, host: host }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        fastify.log.info(`server listening on ${address}`)
    });
}
start();