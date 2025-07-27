// import { z } from "zod";

// const phoneSchema = z.object({
//   phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
// });

// export const sendOTP = async (phone, otp) => {
//   // ✅ Validate input on backend
//   const validated = phoneSchema.safeParse({ phone });
//   if (!validated.success) {
//     throw new Error("Invalid phone number");
//   }

//   const API_KEY = process.env.FAST2SMS_API;

//   const data = {
//     sender_id: "FSTSMS",
//     message: `Your OTP code is ${otp}`,
//     language: "english",
//     route: "q",
//     numbers: phone,
//   };

//   try {
//     const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         authorization: API_KEY,
//         "Content-Type": "application/json",
//       },
//     });

//     const resJson = await response.json();

//     if (resJson.return) {
//       console.log("✅ OTP sent successfully");
//     } else {
//       console.error("❌ Failed to send OTP:", resJson);
//     }

//     return resJson;
//   } catch (error) {
//     console.error("❌ Error sending OTP:", error.message);
//     throw new Error("Failed to send OTP");
//   }
// };

import express from "express";
// import Joi from "joi";
// import axios from "axios";
// import moment from "moment";
// import _ from "lodash";
// import dotenv from "dotenv";
import connection from "../config/connectDB.js";
import moment from "moment";
import _ from "lodash";
// import { connection } from "./db"; // your DB connection
// import utils from "./utils";

const utils = {
  generateUniqueNumberCodeByDigit(digit) {
    const timestamp = new Date().getTime().toString();
    const randomNum = _.random(1e12).toString();
    const combined = timestamp + randomNum;
    return _.padStart(combined.slice(-digit), digit, "0");
  },
  getIpAddress(req) {
    let ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (ipAddress.substr(0, 7) == "::ffff:") {
      ipAddress = ipAddress.substr(7);
    }
    return ipAddress;
  },
};

export const sendOtpCode = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
        status: false,
      });
    }

    const now = Date.now();
    const timeEnd = moment().add(1, "minute").valueOf();
    const otp = utils.generateUniqueNumberCodeByDigit(6);

    const [rows] = await connection.query(
      "SELECT * FROM users WHERE `phone` = ? AND veri = 1",
      [phone]
    );

    if (_.isEmpty(rows)) {
      return res.status(200).json({
        message: "Otp sent successfully",
        status: false,
      });
    }

    if (rows[0].time_otp - now <= 0) {
      const response = await axios({
        method: "GET",
        url: `https://www.fast2sms.com/dev/bulkV2`,
        params: {
          authorization: process.env.FAST2SMS_API,
          route: "q",
          message: `Your verification code is ${otp}`,
          flash: 0,
          numbers: phone,
        },
      });

      if (response.data.return) {
        await connection.execute(
          "UPDATE users SET otp = ?, time_otp = ? WHERE phone = ?",
          [otp, timeEnd, phone]
        );
        return res.status(200).json({
          message: "Otp sent successfully",
          status: true,
          timeStamp: now,
          timeEnd,
        });
      }

      return res.status(400).json({
        message: "Unable to send OTP code",
        status: false,
      });
    } else {
      return res.status(200).json({
        message: "You can send otp code again after 1 minute",
        status: false,
        timeEnd: rows[0].time_otp,
        timeStamp: now,
      });
    }
  } catch (error) {
    console.error("OTP Error:", error.message);
    if (error.response) {
      console.error("SMS API Response Error:", error.response.data);
    }
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
