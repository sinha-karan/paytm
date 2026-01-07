const express = require("express");
const app = express();
const cors = require("cors"); 
const mongoose =  require("mongoose")

app.use(cors());
app.use(express.json());

const  rootRouter  = require("./routes/index");

app.use("/api/v1", rootRouter);

mongoose.connect("mongodb+srv://0308karansinha:lu57k615pCSMxCom@admin.dmc7tlx.mongodb.net/paytm_week8")
      .then(() => {
        console.log("DB is On!")
        app.listen(3000, () => {
          console.log("Server Started!")
        });
}).catch(err => console.log("DB connection failed:",err));

