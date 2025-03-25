import { Elysia } from "elysia";
import Database from "bun:sqlite";
import {cors} from "@elysiajs/cors"

const app = new Elysia();
app.use(cors());
const db = new Database("Database/mydb.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY,
  title TEXT,
  author TEXT
)`);

interface bodyPost {
  title:string,
  author:string
};

app.get("/", () => {
  return "Hello Elysia";
});

app.get('/books', () => {
  const books: bodyPost[] = db.query('SELECT * FROM books').all() as bodyPost[];
  return books;
});

app.post('/books', ({ body }: {body: bodyPost}) => {
  try {
    db.run('INSERT INTO books (title, author) VALUES (?, ?)', [body.title, body.author]);
    return body;
  } catch (error) {
    return error;
  }
});

app.put('/books/:id', ({ body, params }: { body: bodyPost, params: { id: number } }) => {
  try {
    db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', [body.title, body.author, params.id]);
    return body;
  } catch (error) {
    return error;
  }
})

app.delete('books/:id', ({ params: {id} }) => {
  try {
    db.run('DELETE FROM books WHERE id = ?', [id]);
    return "ลบข้อมูลแล้ว";
  } catch (error) {
    return error;
  }
})

app.listen(5500);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
