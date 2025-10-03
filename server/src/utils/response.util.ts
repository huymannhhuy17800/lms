export class ResponseUtil {
    static success<T>(data: T, message: string, status: number){
        return {
            status,
            message,
            data
        }
    }

    static error<T>(data: T, message: string, status: number){
        return {
            status,
            message,
            data
        }
    }

    static paginated<T>(
        data : T[], message : string, status: number, total : number, page: number, limit: number){
        return {
            status, 
            message,
            data,
            pagination : {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }

        }
    }
}