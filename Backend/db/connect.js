const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const connectoracle = async() => {
    try {
        const cons = await oracledb.getConnection({
            user: "system",
            password: "system",
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)))"
        });
        
        await cons.execute(`insert into client_master values('sas', 'Delhi')`);
        await cons.execute(`insert into client_master values('sakhs', 'Delhi')`);
        await cons.execute(`insert into client_master values('dhama', 'Mumbai')`);

        const data = await cons.execute(`SELECT * FROM  client_master`);
        console.log(data.rows);
        console.log('Connected Successfully');

        return cons; // Exporting the connection object
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectoracle;


// const mongoose = require(`mongoose`);

// mongoose.set("strictQuery",false);

// const connectDB = (url)=>{
//     return mongoose.connect(url);
// }

// module.exports = connectDB;
