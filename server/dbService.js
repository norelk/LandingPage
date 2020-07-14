const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USERNAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    port : process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
     console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getUserByMailAndPass(email,pass){
        const response = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM users WHERE email= '${email}' AND password= '${pass}';`;

            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });

        return response;
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM leads;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            
        }
    }

    async getRowById(id) {
        try {
                const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM leads WHERE id = ${id}`;

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
            })
            });
            return response;
        } catch (error) {
            console.log(error);
            
        }
    }

    async insertNewLead(fullName, email, phone, city, check1, check2) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO leads (full_name, email, phone_number, city, check1, check2) VALUES (?,?,?,?,?,?);";

                connection.query(query, [fullName, email, phone, city, check1, check2] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
             return {
                 id: insertId,
                 email: email,

             };
        } catch (error) {
            console.log(error);
            
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM leads WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    async updateNameById(id, full_name, email, phone_number, city) {
        try {
            console.log("Id - " + id, full_name, email, phone_number, city);
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = `UPDATE leads 
                    SET full_name = '${full_name}',
                    email = '${email}',
                    phone_number = '${phone_number}',
                    city = '${city}'
                    WHERE id = ${id}`;
    
                connection.query(query, [id, full_name, email, phone_number, city] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;
