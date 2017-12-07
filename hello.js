"use strict";

var documentClient = require("documentdb").DocumentClient;
var DocumentBase = require("documentdb").DocumentBase;

var config = {
  endpoint : "input your documentdb endpoint",
  primaryKey : "input your documentdb primaryKey",
  database : {
    "id": "HelloDB"
  },
  collection : {
    "id": "HelloColl"
  }

}



var connectionPolicy = new DocumentBase.ConnectionPolicy();
connectionPolicy.PreferredLocations = ['West US'];

var readConnectionPolicy = new DocumentBase.ConnectionPolicy();
readConnectionPolicy.PreferredLocations = ['Korea South','West US'];

var document = {"msg":"hello world!", "ts":new String(new Date())};



var client = new documentClient(config.endpoint, { "masterKey": config.primaryKey }, connectionPolicy);
var readclient = new documentClient(config.endpoint, { "masterKey": config.primaryKey }, readConnectionPolicy);

var HttpStatusCodes = { NOTFOUND: 404 };
var databaseUrl = `dbs/${config.database.id}`; /* dbs/HelloDB */
var collectionUrl = `${databaseUrl}/colls/${config.collection.id}`;  /* dbs/HelloDB/colls/HelloColl */


client.deleteDatabase(databaseUrl, (err) => {
  // if (err) {
  //   console.log(err)
  // }


  client.createDatabase(config.database, function (err, created) {
    if (err) {
      console.log(err)
      return;
    }
    console.log(`database created! ${JSON.stringify(created)}`)
    client.createCollection(databaseUrl, config.collection, { offerThroughput: 400 }, function (err, created) {
      if (err) {
        console.log(err)
        return;
      }

      client.createDocument(collectionUrl, document, function (err, created) {
        if (err) {
          console.log(err)
          return;
        }

        setTimeout(function(){
          readclient.queryDocuments(
            collectionUrl,
            'SELECT r.msg, r.ts FROM root r'
          ).toArray( function(err, results) {
            if (err) {
              console.log(err)
              return;
            }
            else {
              for (var queryResult of results) {
                var resultString = JSON.stringify(queryResult);
                console.log(`Query returned ${resultString}`);
              }
            }
          });
        }, 15000)
      });
    });
  });
});
