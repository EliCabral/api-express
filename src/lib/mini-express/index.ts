import * as http from 'http';

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse, next?: () => void) => void;

export class MiniExpress {
    private middlewares: RequestHandler[] = [];

    use(handler: RequestHandler) {
        this.middlewares.push(handler);
    }

    listen(port: number, callback?: () => void) {
        const server = http.createServer((req, res) => {
            let idx = 0; //inicializa o indice para rastrear qual middleware está sendo executado

            const next = () => {
                // se o indice atual for menor do que o total de middleware registrado..
                if (idx < this.middlewares.length) {
                    // obtem o prox middleware da lista
                    const handler = this.middlewares[idx++];
                    // chamar o middleware atual, passando req, res e a propria funcao next
                    handler(req, res, next);
                } else {
                        res.end();
                }
            };
            next();
        });
        server.listen(port, callback);
    }
}
