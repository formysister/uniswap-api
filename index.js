`use strict`;
/**
 * root node call defined here
 */
import 'dotenv/config';
import Server from './src/bin/server.js';

new Server().init();
