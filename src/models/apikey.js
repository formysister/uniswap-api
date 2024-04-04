`use strict`;

/**
 * modules imported here
 **/

import MONGOOSE from 'mongoose';
const Schema = MONGOOSE.Schema;

const apikey = new Schema(
  {
    api_key: { type: String, default: '' },
    claimTimestamp: { type: Number, default: 0 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    versionKey: false
  },
);

apikey.plugin(require('mongoose-beautiful-unique-validation'))

const ApiKey = MONGOOSE.model(`apikeys`, apikey, 'apikey');
export default ApiKey;