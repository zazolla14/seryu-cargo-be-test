## Built With
* [Node.js][Nodejs-url]
* [Typescript][Typescript-url]
* [ExpressJs][Express-url]
* [PostreSQL][Postgresql-url]
* [KnexJs][Knex-url]


## Getting Started


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/NawiOne/seryu-cargo-test.git
   ```
2. Switch to the repo folder
   ```sh
   cd seryu-cargo-test
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your Key in `.env`
   ```js
    DB_URL=
    DB_HOST=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
   ```
5. Migrate Database<br>
   you can migrate database using 
   ```sh
    npm run migrate
    npm run seed
    ```

5. Run the application<br>
   ```sh
    npm start
    ```

## Endpoint List
**BASE URL -> http://localhost:3000**

**Salary Driver List**

 GET -> /api/v1/salary/driver/list<br>
 *query param :*
   * month *
   * year *
   * page_size 
   * current
   * driver_code
   * status
   * name


[Nodejs-url]:https://nodejs.org/en
[Express-url]: https://expressjs.com/
[Typescript-url]: https://www.typescriptlang.org/
[Postgresql-url]: https://www.postgresql.org/
[Knex-url]: https://knexjs.org/
 
