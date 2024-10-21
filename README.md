## Seryu Cargo Backend Test

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NawiOne/seryu-cargo-test.git
   ```
2. Install packages
   ```sh
   npm install
   ```
3. Enter your Key in `.env`

   ```js
    DB_HOST=
    DB_NAME=
    DB_USERNAME=
    DB_PASSWORD=
   ```

4. Run the application<br>
   It will auto run migration dan seeder data
   ```sh
    npm start
   ```

## Endpoint List

**BASE URL -> http://localhost:3000**

**Salary Driver List**

GET ->
/api/v1/salary/driver/list<br>
_query param :_

- month \*
- year \*
- page_size
- current
- driver_code
- status
- name

## Built With

- [Node.js][Nodejs-url]
- [Typescript][Typescript-url]
- [ExpressJs][Express-url]
- [PostreSQL][Postgresql-url]
