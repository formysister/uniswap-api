`use strict`;

/**
 * modules imported here
 **/

import MONGOOSE from 'mongoose';
const Schema = MONGOOSE.Schema;

const address = new Schema(
  {
    address: { type: String, default: '' },
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

address.plugin(require('mongoose-beautiful-unique-validation'))

const Address = MONGOOSE.model(`addresses`, address, 'address');
export default Address;