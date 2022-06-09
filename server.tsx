// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from 'https://deno.land/x/servest@v1.3.4/mod.ts';

const app = createApp();

const colorsArray: any[] = [];

const handleColor = (event: any) => {
  event.preventDefault();
  console.log('event', event);
  colorsArray.push('blue');
}

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Deno</title>
        </head>
        <body>
          <h1>Hello!</h1>
          <form action="/api/addColor" method="post" encType='multipart/form-data' onSubmit={handleColor}>
            <label htmlFor="color">Color:</label>
            <input type="text" name="color" id="color" onChange={handleColor} />
          </form>
          <ul>{colorsArray.map(color => <li style={{color: color}} key={color}>{color}</li>)}</ul>
        </body>
      </html>),
  });
});

app.post("/api/addColor", async (req) => {
  colorsArray.push((await req.formData()).value('color'));
  await req.redirect('/');
});

const PORT = 8080;

app.listen({ port: PORT });

console.log(`Server is up and running on port ${PORT}`);
