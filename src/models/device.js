`use strict`;

/**
 * modules imported here
 **/

import MONGOOSE from 'mongoose';
const Schema = MONGOOSE.Schema;

const device = new Schema(
  {
    ipHash: { type: String, default: '' },
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

device.plugin(require('mongoose-beautiful-unique-validation'))

const Device = MONGOOSE.model(`devices`, device, 'device');
export default Device;