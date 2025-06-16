import expressAsyncHandler from "express-async-handler";
import Images from "../../schema/image/image.schema";
import { Request, Response } from "express";

export const saveNewImage = async (req: Request, res: Response) => {
    try {

        req.body.user = req.body.id
        const saveImage = await Images.create(req.body)

        if (saveImage) {
            res.status(201).send({ result: saveImage });
        }
        else {
            res.status(500).send({ result: 'Something went wrong. Failed to save new image' });
        }
    }
    catch (error) {
        res.status(500).send({ result: 'Something went wrong. Failed to save new image' });
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    try {

        const { imageId } = req.params

        const deleteImage = await Images.findByIdAndDelete(imageId)

        if (deleteImage) {
            res.status(201).send({ result: "Image delete successfully" });
        }
        else {
            res.status(500).send({ result: ' Failed to delete image' });
        }
    }
    catch (error) {
        res.status(500).send({ result: 'Something went wrong. Failed to delete image' });
    }
}

export const getAllImagesOfUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.body

        const getImagesOfUser = await Images.find({ user: id })

        if (getImagesOfUser) {
            res.status(200).send({ response: getImagesOfUser });
        }
        else {

            res.status(400).send({ response: "Failed to get all images of a user" });
        }
    }
    catch (error) {
        res.status(500).send({ response: "Something went wrong. Failed to get all images of a user" })
    }
}