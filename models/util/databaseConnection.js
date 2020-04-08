const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'ec2-34-200-101-236.compute-1.amazonaws.com',  
    user: 'qiwztikgsdktoz',  
    database: 'd85aa3tqv2dtqf',  
    password: 'f0af98f3a84933d2018510ff4ab25f8f290eb62c2c21aeb2b06093551329d4f9',
    port: 5432,
    ssl: true
});  

module.exports = pool;