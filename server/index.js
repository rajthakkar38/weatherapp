const { response } = require("express");
const express = require("express");
const https=require("https");
const http=require("http");
const PORT = process.env.PORT || 3001;

const app = express();
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });  
  });
  //defining the route and extracting the query parameters from the url
  app.get('/city/:city', function(req, res)  {
   // res.send(req.params);
    console.log(req.params)
    let data=''
    let body={}
    var city=req.params.city;
    var url="http://api.weatherstack.com/current?access_key=3f6510494aa0e5265fd47bbe1ee4dea0&query="+city;
    console.log(url)

    //making HTTP get request through HTTP.request method 
    const req1 = http.request(url, (res1) => {
     // console.log(res1.headers)

     //concatenating the data into a single string 
      res1.on('data', (chunk) => {
      data = data + chunk.toString();
      //  console.log(data)
      });
      // converting the response data from a string to JSobject 
    res1.on('end', () => {
       body = JSON.parse(data);
      console.log(body);
      //sending the body as response to the react front end. 
      res.send(body)
      console.log("response is",body)
      });
   
    })
    //error handling 
    req1.on('error', (error) => {
      console.log('An error', error);
    });

    req1.end();


});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});