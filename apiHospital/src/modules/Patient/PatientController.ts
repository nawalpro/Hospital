import { Response, Request, NextFunction } from "express";
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'
import JwtService from "../../libs/jwt";
import { IPatientService } from './PatientService';
import { auth } from "../../middlewares";

@Controller('patient')
class PatientController {
    private patienService;
    private jwtService;
    constructor(patienService: IPatientService, jwtService: JwtService) {
        this.patienService = patienService;
        this.jwtService = jwtService;
    }

    @Get()
    @Middleware(auth.isAuth)
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let users = await this.patienService.getAll();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    @Post()
    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('toto', req.body);
            const user = await this.patienService.register({...req.body});
            res.status(201).json(user);
        }
        catch (err) {
            next(err);
            console.log(err, "err register");
            
        }
    }

    @Post('login')
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.patienService.login({...req.body});
            const token = await this.jwtService.generateToken({ id: user.id });
            res.cookie('auth-cookie', token, {expires: new Date(Date.now() + (30 * 86400 * 1000))});
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }

    }
}

export default PatientController;