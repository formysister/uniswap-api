'use strict';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';
import got from 'got';
import sharp from 'sharp';
import {
  SERVER,
  USER_TYPE,
  LANGUAGE,
  STATUS_MSG,
  COMMON_STATUS,
  MODELS_NAME,
} from '../config/AppConstraints';
import DAO from '../services/queries';
import { createLogger, transports, format } from 'winston';
import Joi from 'joi';
/***************************************
 **** Logger for error and success *****
 ***************************************/

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ],
});

export const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const messageLogs = (error, success) => {
  if (error) logger.error(`\x1b[31m` + error, 'messageLogsErr');
  else logger.info(`\x1b[32m` + success);
};

export const createDefaultData = async () => {
  try {
    Promise.all([createPublicDirectory(), createSuperAdmin()])
      .then(res => {
        console.log('Bootstrap Successfully');
      })
      .catch(err => {
        console.log(err, 'error in bootstraping');
      });
  } catch (err) {
    console.log(err, 'createDefaultDataErr');
    return false;
  }
};

export const fileUpload = async file => {
  try {
  } catch (err) {
    console.log(err, '========');
    throw err;
  }
};

export const uploadFileBuffer = async (buffer, newName, mimeType, userId) => {
  try {
    return await uploadOriginalImage(buffer, newName, mimeType, userId);
  } catch (err) {
    console.log(err, '========');
    throw err;
  }
};

const writedirAsync = (path, data) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, data, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const resizeImageToThumbnail = async (imagePath) => {
  try {
    // let fileBuffer = await readFile(imagePath);
    return await sharp(imagePath)
      .resize(200, 200, {
        fit: sharp.fit.inside,
        position: sharp.strategy.entropy,
      })
      .toBuffer();
  } catch (err) {
    throw err
  }
}

export const getFileBuffer = async payload => {
  try {
    return '';
  } catch (error) {
    let newPath = path.join(__dirname, '../../public/uploads/', 'default.png');
    let filePath = path.join(__dirname, '../views/assets/default.png');
    let fileBuffer = await readFile(filePath);
    await sharp(fileBuffer)
      .resize(Number(payload.height || 700), Number(payload.width || 700), {
        fit: sharp.fit.inside,
        position: sharp.strategy.entropy,
      })
      .toFile(newPath);
    return newPath;
  }
};

async function readFile(path, data) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

async function createPublicDirectory() {
  try {
    const newPath = path.join(__dirname, `../../public/uploads`);
    let isExists = await fs.existsSync(newPath);
    if (!isExists) {
      fs.mkdir(newPath, { recursive: true }, function (err, result) {
        console.log('Created');
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export const escapeRegExp = str => {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

export const dateTimeFormatString = date => {
  let month = new Date(date).getMonth() + 1;
  let dateValue = new Date(date).getDate();
  let year = new Date(date).getFullYear();
  if (month < 10) month = '0' + month;
  if (dateValue < 10) dateValue = '0' + dateValue;
  return month + '/' + dateValue + '/' + year;
};

export const authorizationHeader = Joi.object({
  authorization: Joi.string().required(),
  'accept-language': Joi.string().required().valid(LANGUAGE.EN),
}).unknown();

export const authorizationHeaderOptional = Joi.object({
  authorization: Joi.string().optional().allow(''),
  'accept-language': Joi.string().required().valid(LANGUAGE.EN),
}).unknown();

export const languageHeader = Joi.object({
  'accept-language': Joi.string().required().valid(LANGUAGE.EN),
}).unknown();

export const validateSchema = (data, schema, options) => {
  return new Promise((resolve, reject) => {
    Joi.validate(data, schema, options, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

export const currentMonthStartEnd = () => {
  try {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let startDate = new Date(new Date(y, m, 1).setHours(0, 0, 0, 0));
    let endDate = new Date(new Date(y, m + 1, 0).setHours(23, 59, 59, 999));
    return { startDate, endDate };
  } catch (err) {
    console.log(err);
  }
};

export const currentDateString = () => {
  try {
    return `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1
      }-${new Date().getDate() < 10
        ? `0${new Date().getDate()}`
        : new Date().getDate()
      }`;
  } catch (err) {
    console.log(err);
  }
};

export const countryDataFinder = async ip => {
  try {
    const url = `http://ip-api.com/json/${ip}`;
    let countryData = await got(url).json();
    if (countryData && countryData.country) {
      return countryData.country;
    } else {
      return '';
    }
  } catch (err) {
    console.log(err);
  }
};

export const paymentGatewayService = async () => {
  try {
    const url = ``;
    return url;
  } catch (err) {
    console.log(err);
  }
};