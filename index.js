/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    app = express().use(bodyParser.json());
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
    console.log(`Webhook is listening on PORT:${PORT}`);
});

// Creates the endpoint for our webhook
app.post("/webhook", (req, res) => {
    let body = req.body;

    // Iterates over each entry - there may be multiple if batched
    if (body.object === "page") {
        body.entry.forEach(function (entry) {
            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

app.get("/webhook", (req, res) => {
    let VERIFY_TOKEN = "KILLASHANGZ999";

    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        }
    } else {
        res.sendStatus(403);
    }
});

// function handleMessage(sender_psid, received_message) {
//     let response;

//     // Checks if the message contains text
//     if (received_message.text) {
//         // Create the payload for a basic text message, which
//         // will be added to the body of our request to the Send API
//         response = {
//             text: `You sent the message: "${received_message.text}". Now send me an attachment!`,
//         };
//     } else if (received_message.attachments) {
//         // Get the URL of the message attachment
//         let attachment_url = received_message.attachments[0].payload.url;
//         response = {
//             attachment: {
//                 type: "template",
//                 payload: {
//                     template_type: "generic",
//                     elements: [
//                         {
//                             title: "Is this the right picture?",
//                             subtitle: "Tap a button to answer.",
//                             image_url: attachment_url,
//                             buttons: [
//                                 {
//                                     type: "postback",
//                                     title: "Yes!",
//                                     payload: "yes",
//                                 },
//                                 {
//                                     type: "postback",
//                                     title: "No!",
//                                     payload: "no",
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         };
//     }

//     // Send the response message
//     callSendAPI(sender_psid, response);
// }

// function handlePostback(sender_psid, received_postback) {
//     console.log("ok");
//     let response;
//     // Get the payload for the postback
//     let payload = received_postback.payload;

//     // Set the response based on the postback payload
//     if (payload === "yes") {
//         response = { text: "Thanks!" };
//     } else if (payload === "no") {
//         response = { text: "Oops, try sending another image." };
//     }
//     // Send the message to acknowledge the postback
//     callSendAPI(sender_psid, response);
// }

// function callSendAPI(sender_psid, response) {
//     // Construct the message body
//     let request_body = {
//         recipient: {
//             id: sender_psid,
//         },
//         message: response,
//     };

//     // Send the HTTP request to the Messenger Platform
//     request(
//         {
//             uri: "https://graph.facebook.com/v2.6/me/messages",
//             qs: { access_token: PAGE_ACCESS_TOKEN },
//             method: "POST",
//             json: request_body,
//         },
//         (err, res, body) => {
//             if (!err) {
//                 console.log("message sent!");
//             } else {
//                 console.error("Unable to send message:" + err);
//             }
//         }
//     );
// }
