const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Create Lead
app.post("/insert", (request, response) => {

  const { fullName, email, phone, city, check1, check2 } = request.body;

  const db = dbService.getDbServiceInstance();

  const result = db.insertNewLead(fullName, email, phone, city, check1, check2);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//Login
app.get("/login/:email/:password", async (request, response) => {
    const { email, password } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.getUserByMailAndPass(email, password);

    result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));

});

//GetAll
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

//GetId
app.get('/get/:id', (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.getRowById(id);

  result
  .then(data => response.json({data : data}))
  .catch(err => console.log(err));

})

//update Lead
app.patch('/update', (request, response) => {
  const { id, full_name, email, phone_number, city } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.updateNameById(id, full_name, email, phone_number, city);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));

})

//Delete Lead
app.delete('/delete/:id', (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();

  const result = db.deleteRowById(id);

  result
  .then(data => response.json({success : data}))
  .catch(err => console.log(err));

})

app.listen(process.env.PORT, () => console.log("app is running"));
