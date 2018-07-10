// const expect = require('expect');
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;
import request from "supertest";
import app from "../../app";

console.log(process.env.MySQL)

describe("Index.js", () => {
    describe("GET /index", () => {
        // test("Main Page", async () => {
        //     const response = await request(app).get('/');
        //     expect(response.statusCode).toBe(200);
            // .then(res => {
            //     expect(res.statusCode).toBe(200);
            //     done();
            // })
            // .catch(err => {
            //     if (err) throw err;
            // })
        // })
        test("Main page", (done) => {
            request(app)
                .get("/")
                .expect(200)
                .end(done)
        })
    })

    // describe("GET /registro", () => {
    //     test("Register Page", (done)=>{
    //         request(app)
    //             .get('/registro')
    //             .expect(200)
    //             .end(done)
    //     })
    // })

    // describe("POST /registro", () => {
    //     test("Validator and Insert", (done)=>{
    //         request(app)
    //             .post("/registro")
    //             .then(res => {
    //                 expect(res.statusCode).toBe(200);
    //                 done();
    //             })
    //     })
    // })

    describe("GEt /login", () => {
        test("Login page", (done)=>{
            request(app)
                .get('/login')
                .expect(200)
                .end(done)
        })
    })
})