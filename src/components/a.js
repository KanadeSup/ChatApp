const sql = require('mssql')

const config = {
    user: 'sa',
    password: '@Dm1nistrator',
    server: 'firar.live',
    database: 'pbl6',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

sql.connect(config).then(() => {
    const request = new sql.Request();
    request.query('SELECT * FROM [User].[Users]', function (err, recordset) {
        if(err) console.log(err);
        console.log(recordset);
    });
}).catch(err => {
    console.error("Error connecting to the database: ", err)
})
