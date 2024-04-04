'use strict';
import 'dotenv/config';
import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import { Routes_v1 } from '../routes/V1';
import Vision from '@hapi/vision'
import path from 'path';
class Server {
  init = async () => {
    try {
      const server = new Hapi.Server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: { cors: true },
      });

      global.ObjectId = mongoose.Types.ObjectId;
      server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
          return reply.view('index');
        },
      });

      server.events.on('response', function (request) {
        if (process.env.NODE_ENV === 'development') {
          console.log(
            'api hited',
            JSON.parse(JSON.stringify(request.url)),
            '=======',
          );
        }
      });

      // await mongoose.connect( process.env.DB_URL_ATLAS );

      await server.register(Vision);
      await server.views({
        engines: { html: Handlebars },
        relativeTo: __dirname,
        path: path.join(__dirname, '../views'),
      });
      await server.route(Routes_v1);
      await server.start();

      console.log('Server running on %s', server.info.uri);
    } catch (err) {
      console.log(err, '======error occured======');
    }
  };  
}

export default Server;