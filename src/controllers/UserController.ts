import {Request, Response,} from 'express';

import BaseController from "./Common";
import User from "../schemas/User"


export default class UserController implements BaseController {
    constructor() {

    }

    index(req: Request, res: Response) {

    }

    registerUser(req: Request, res: Response) {
        res.json({username: req.body.username, email: req.body.email, userExists: req.body.userExists || "nothing"});
    }

    validateUser(req: Request, res: Response) {
        console.log("validating user...");
        User.exists({
            username: req.body.username, 
            email: req.body.email
        }, function (err, result) {
            if(err) req.body.userExists = false;
            else {
                User.find({
                    username: req.body.username, 
                    email: req.body.email
                }).then(users => {
                    const user = users[0];
                    req.body.userExists = true;
                    req.body.user = user;
                });
            } 
        });
    }

    registerKey(req: Request, res: Response) {
        
    }

    validateKey(req: Request, res: Response) {
        
    }

}