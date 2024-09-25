import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const { Pool } = pg;

// Create a new pool instance
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'CrimeReporter',
  password: 'abhishek27k',
  port: 5432,
});

app.use(express.json());
app.use(cors());
// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.send('<h1>Hello World</h1>');
});

// New route to test database connection
app.get('/test-db', async (req, res) => {
    try {
        console.log(req.query.district.toUpperCase());
        const result = await pool.query('SELECT * FROM CRIMINALDATA WHERE DISTRICT = $1', [req.query.district.toUpperCase()]);
        res.json({ message: 'Database connected successfully', data: result.rows });
    } catch (err) {
        console.error('Error connecting to the database', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.get('/test-db2', async (req, res) => {
    try {
        console.log(req.query.state_ut.toUpperCase());
        const result = await pool.query('SELECT * FROM CRIMINALDATA WHERE STATE_UT = $1', [req.query.state_ut.toUpperCase()]);
        res.json({ message: 'Database connected successfully', data: result.rows });
    } catch (err) {
        console.error('Error connecting to the database', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.get('/criminaltrends', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TRENDS');
        console.log(result.rows);
        res.json({data: result.rows });
    } catch (err) {
        console.error('Error connecting to the database', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
