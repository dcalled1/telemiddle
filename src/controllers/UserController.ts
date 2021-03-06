import { Request, Response, } from 'express';
import UUIDAPIKey, { ApiKeyInfo } from "uuid-apikey";

import BaseController from "./Common";
import User, { UserDocument } from "../schemas/User"
import Key, { KeyDocument } from "../schemas/Key"


export default class UserController implements BaseController {
    constructor() {

    }

    async index(req: Request, res: Response) {
        const users = await User.find({});
        res.json(users);
    }

    async registerUser(req: Request, res: Response) {
        const { userExists, usernameExists, emailExists } = req.body;
        const userData = {
            username: req.body.username,
            email: req.body.email
        };
        if (userExists || usernameExists || emailExists) {
            res.json({message: "User already exists (username and email must be different)"});
        } else {
            const newUser = new User(userData);
            await newUser.save();
            res.json({ userData, status: "User created!" });
        }
    }

    async validateUser(req: Request, res: Response) {
        const {username, email} = req.body;
        if(!username || !email) {
            req.body.validRequest = false;
            return;
        }
        req.body.validRequest = true;
        const userData = {
            username: username,
            email: email
        };
        if (await User.exists(userData)) {
            req.body.userExists = true;
        } else if (await User.exists({ username})) {
            req.body.userExists = false;
            req.body.usernameExists = true;
        } else if (await User.exists({ email })) {
            req.body.userExists = false;
            req.body.emailExists = true;
        } else req.body.userExists = false;

    }

    async registerKey(req: Request, res: Response) {
        const { userExists, emailExists, usernameExists, username, email, appname } = req.body;

        if (!userExists) {

            if (emailExists || usernameExists) {
                res.status(400).json({message: "Inconsistent user"});
                return;
            } else {
                res.status(400).json({message: "Must have an user first."});
                return;
            }

        }
        const user = (await User.find({ username, email }))[0];
        let token: ApiKeyInfo;
        do token = UUIDAPIKey.create();
        while (await Key.exists({uuid: token.uuid}))
        const { uuid, apiKey } = UUIDAPIKey.create();
        const key = new Key({
            appname,
            uuid,
            owner: user.id,
        });
        await key.save();
        res.json({ status: "Key created succesfully", apiKey });

    }

    async validateKey(req: Request, res: Response) {
        const {username, apiKey} = req.body;
        
        req.body.usernameExists = false;
        req.body.validKeySintax = false;
        req.body.validKey = false;
        req.body.validRequest = false;

        if(!username || !apiKey) {
            console.log("invalid request")
            return;
        }
        req.body.validRequest = true;


        if(!(await User.exists({username}))) return;
        
        req.body.usernameExists = false;

        if(!UUIDAPIKey.isAPIKey(apiKey)) {
            
            console.log("invalid apikey")
            return;
        }

        req.body.validKeySintax = true;

        const user = (await User.find({username}))[0];
        const keys = await Key.find({owner: user.id});
        let ok = false;
        keys.forEach(key => {
            if(UUIDAPIKey.check(apiKey, key.uuid)) ok = true;
        });
        req.body.validKey = ok;
    }

}