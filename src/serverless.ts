import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import serverlessExpress from "@codegenie/serverless-express";

import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';


let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: ['http://localhost:5173', 'https://keolis.benchfix.com', 'http://keolis.benchfix.com'],
        credentials: true
    })
    await app.init()

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress(expressApp)
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback
) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback)
}
