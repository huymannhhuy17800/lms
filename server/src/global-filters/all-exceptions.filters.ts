/*eslint-disable */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

    private readonly logger = new Logger(AllExceptionsFilter.name);
    constructor(private httpAdapterHost: HttpAdapterHost){};

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        this.logger.error(`Exception ${JSON.stringify(exception)} Status: ${httpStatus}`);

        const responseBody = {
            statusCode : httpStatus,
            message: 'Internal server error',
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}