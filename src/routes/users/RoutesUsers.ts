import express from 'express';
import {app} from '../../index';
import {addUser} from "../../ddbb/users/PeticionesUsers";

app.post("/register", (req: express.Request, res: express.Response) : express.Response => {
    return res.send(addUser(req.body));
});