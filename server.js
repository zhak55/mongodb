// First you need CMD: press Win + R, then type cmd, press OK
// and download MongoDB for Windows from: http://www.mongodb.org/downloads
// Create folder 'mongodb' using the following command in the Command Prompt:
// md \mongodb
// and  extract the downloaded file to the folder. (c:\mongodb)
// Then create directory for your database:
// mkdir c:\data\db
// Now we need a node.js driver for MongoDB
// it is possible to install from node.js using 'npm'
// npm install mongodb
// Install mongoose - is the ODM for Node.js ( http://mongoosejs.com/ )
// npm install mongoose
// Run MongoDB using CMD:
// cd ../../mongodb/bin
// > mongod
// We are ready to use our NoSQL database. Let's make some tests using CMD:
// > mongo users 
// > db.test.insert({name: Roman})
// > db.test.find()
// and you get smth like this: { "_id" : ObjectId("5363dfeab276d23125abf620"), "name" : "Roman" }

// Check it out in Node.js:

 var mongo = require('mongoose')
   , db;
 
  mongo.connect('mongodb://127.0.0.1/test');
  db = mongo.connection;
  db.on('error', console.error.bind(console, 'Error: '));
  
  // we can define schema. I got from my long-polling chat
  
  var messages = new mongo.Schema({
        id     : Number,
   //   date   : Date,
        msg    : String,
        author : String
  //          attachments: {
  //            photo   :    Array,
  //            stickers:    String
  //        }
     }); 
   
   // compile our model
   // the last parameter is the name of collection
   var MSG = mongo.model('Msg', messages, 'msg');  
   
   //save messages
   MSG.create({id: 1, msg: 'Hello, World!', author: 'Roman Zhak'}, function ( err, res ) {

           if (err) return onError(err);
             console.log('Saved')
             console.log( res )
         }); 
     
  // find messages that was written by Roman

  MSG.find({author: /Roman/i}, function ( err, docs ) { 

     console.log( docs );
     
  }); 
