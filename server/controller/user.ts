import { H3Event } from 'h3'
import * as userModel from '~/server/model/user'

export const read = async () => {
    try {
        const result = await userModel.all();

        return {
            data: result
        };
    } catch(error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'+error,
        })
    }
}


export const create = async (evt: H3Event) => {
    try {
        const body = await readBody(evt)
        const result = await userModel.create({
            name: body.name,
            email: body.email
        });

        return {
            data: result
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message,
        })
    }
}

export const detail = async (evt: H3Event) => {
    try {
        const result = await userModel.detail(evt.context.params?.id as string);

        return {
            data: result
        };
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong',
        })
    }
}

export const update = async (evt: H3Event) => {
    try {
        const body = await readBody(evt)
        const result = await userModel.update(evt.context.params?.id as string, {
            name: body.name,
            email: body.email
        });

        return {
            data: result
        };
    } catch (error) {
        console.log(error);
        
    }
}

export const remove = async (evt: H3Event) => {
    try {
        const result = await userModel.remove(evt.context.params?.id as string);

        return {
            data: result
        };
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong',
        })
    }
}