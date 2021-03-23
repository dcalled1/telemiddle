import {Request, Response,} from 'express';

import BaseController from "./Common";
import User, { UserDocument } from "../schemas/User"


export default class UserController implements BaseController {
    constructor() {

    }

    async index(req: Request, res: Response) {
        const users = await User.find({});
        res.json(users);
    }

    async registerUser(req: Request, res: Response) {
        const {userExists, usernameExists, emailExists} = req.body;
        const userData = {
            username: req.body.username, 
            email: req.body.email
        };
        if(userExists || usernameExists || emailExists) {
            res.send(`User already exists (username and email must be different)`);
        } else {
            const newUser = new User(userData);
            await newUser.save();
            res.json({userData, status: "User created!"});
        }
    }

    async validateUser(req: Request, res: Response) {
        const userData = {
            username: req.body.username, 
            email: req.body.email
        };
        if(await User.exists(userData)) {
            const user = await User.find(userData);
            req.body.userExists = true;
            req.body.userObject = user[0];
        } else if(await User.exists({username: userData.username})) {
            req.body.userExists = false;
            req.body.usernameExists = true;
        } else if (await User.exists({email: userData.email})) {
            req.body.userExists = false;
            req.body.emailExists = true;
        } else req.body.userExists = false;
        
    }

    registerKey(req: Request, res: Response) {
        
    }

    validateKey(req: Request, res: Response) {
        
    }

}