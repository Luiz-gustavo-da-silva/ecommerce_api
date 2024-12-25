import { Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response) => { 

    const product = await prismaCilent.product.create({
        data:{
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })

    res.json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const product = req.body;

        if(product.tags){
            product.tags = product.tags.join(',')
        }

        const updatedProduct = await prismaCilent.product.update({
            where:{
                id: +req.params.id
            },
            data: product
        })

        res.json(updatedProduct)

    }catch(error){
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {

}

export const listProduct = async (req: Request, res: Response) => {

    const count = await prismaCilent.product.count();

    const products = await prismaCilent.product.findMany({
        take: 5,
        skip: +req.query.offset || 0
    })

    res.json({
        count, data: products
    })
}

export const getProductById = async (req: Request, res: Response) => {
    try{
        const product = await prismaCilent.product.findFirstOrThrow({
            where:{
                id: +req.params.id
            }
        })

        res.json(product)
    }catch(err){
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND);
    }
}

export const searchProduct = async (req: Request, res: Response) => {
    const products = await prismaCilent.product.findMany({
        where:{
            name: {
                search: req.query.q.toString()
            },
            description: {
                search: req.query.q.toString()
            },
            tags: {
                search: req.query.q.toString()
            }
        }
    })

    res.json(products)
}