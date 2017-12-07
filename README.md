
## cosmosdb-hello-world

This is a very simple demo to show how to connect cosmosdb and how golablly distribution works.

In azure portal create a cosmosdb service in West US and then replicate it to Korea South. 
In the hello.js, input your cosmosdb endpoint and key. This code insert a 'hello world' collection data into a database from the 'West US', and then try to fetch the data from 'Korea South', it seems it need around ten seconds to get the data from there.

> You can change the seconds to a small one,, it will return a 404 error as the data is not syncronized to read location.

Run the demo
```
npm install
node hello.js
```


