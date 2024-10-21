import Joi from "joi";
import { InvalidData } from "../exceptions/invalidData.js";
import { Request, NextFunction } from 'express';
import { ShippingCostStatus as status } from '../enums/status.js'

async function listDriverSalary(req: Request, _, next: NextFunction): Promise<void> {
    const schema = Joi.object({
        year: Joi.number().required(),
        page_size: Joi.number().min(10),
        current: Joi.number().min(1),
        driver_code: Joi.string(),
        name: Joi.string(),
        month: Joi.number()
            .required()
            .min(1)
            .max(12),
        status: Joi.string()
            .valid(
                status.CONFIRMED,
                status.PAID,
                status.PENDING
            ),
    });
    const { error } = schema.validate(req.query);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}


export { listDriverSalary }