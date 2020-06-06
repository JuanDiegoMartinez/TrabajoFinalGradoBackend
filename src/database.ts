import mongoose from 'mongoose';
const url = "mongodb+srv://al341816:12345@cluster0-u6de0.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));