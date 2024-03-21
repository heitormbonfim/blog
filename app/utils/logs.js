export function logs(req, _, next) {
    const method = req.method;
    const query = req.query;
    const body = req.body;
    const headers = req.headers;
    const path = req.path;
    const date = `${new Date().getHours()}h ${new Date().getMinutes()}m - ${new Date().toLocaleDateString("pt-br")}`;
    console.log(`
  ${date} - ${method} ${path}
  headers: ${headers};
  query: ${query}
  body: ${body}
  \n\n
  `);
    next();
}
