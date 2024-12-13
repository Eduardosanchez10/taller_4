declare namespace NodeJS{
    export interface ProcessEnv{
        PORT: number,
        DB_HOST:string
        DB_PORT:number;
        POSTGRESS_DB:string
        POSTGRESS_USER:string
        POSTGRESS_PASSWORD:string
    }
}