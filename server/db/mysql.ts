import mysql from 'mysql2/promise';

interface Options {
  query: string,
  values?: any[]
}

// 创建连接池，设置连接池的参数
const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const sql = async ({query, values}: Options) => {
  const [rows] = await pool.query(query, values);

  return rows
}
