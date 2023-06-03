const mongoose = require("mongoose");


const userDetailsSchema = new mongoose.Schema(
    {
        fname: String,
        lmail: String,
        email: {type: String, unique: true},
        password: String,
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", userDetailsSchema);