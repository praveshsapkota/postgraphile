import * as fs from "fs"
import koa from "koa"
import koaRouter from "koa-router"
import postgraphile from "postgraphile"
import koabody from "koa-body"
// const { database, options, schemas, port } = require("../common")
import { createServer } from "http"

import dotenv from 'dotenv'
dotenv.config()

const app = new koa(),

    router = new koaRouter()

// const middleware_postgraphile = postgraphile(database, schemas, options);


router.get('/', (ctx, next) => {
    ctx.response.body = "hellow"
})

/******************************************************************************/

app
    .use(koabody())
    .use(router.allowedMethods())
    .use(router.routes())
    //     .use(middleware_postgraphile)

    // const server = createServer(app.callback());
    // server.listen(port, () => {
    //     const address = server.address();
    //     if (typeof address !== 'string') {
    //         const href = `http://localhost:${address.port}${options.graphiqlRoute || '/graphiql'}`;
    //         console.log(`PostGraphiQL available at ${href} 🚀`);
    //     } else {
    //         console.log(`PostGraphile listening on ${address} 🚀`);
    //     }
    // });
    .use(
        postgraphile(
            process.env.DATABASE_URL || "postgres://user:pass@host:5432/dbname",
            "public",
            {
                watchPg: true,
                graphiql: true,
                enhanceGraphiql: true,
                exportGqlSchemaPath: `${__dirname}/schema.graphql`
            }
        )
    );



app.listen(process.env.PORT || 3001);