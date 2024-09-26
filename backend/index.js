import express from 'express';
import pg from 'pg';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

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


// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp and its original extension
    },
  });
  
  const upload = multer({ storage: storage });
  
// Endpoint to handle form submission with file upload
app.post("/report", upload.single("image"), async (req, res) => {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : null;
  
    try {
      // Insert data into PostgreSQL database
      const result = await pool.query(
        'INSERT INTO crimereported (gmaplink, description, image) VALUES ($1, $2, $3) RETURNING *',
        [title, description, imagePath]
      );
  
      console.log("Received Report:", { title, description, imagePath });
      res.json({
        message: "Report submitted successfully!",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error inserting into database:", error);
      res.status(500).json({ error: "Failed to submit report" });
    }
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


app.get('/criminalhelp', async (req, res) => {
    try {
        const result = await pool.query('SELECT helpline FROM complain where complaintype = $1', [req.query.complain]);
        console.log(result.rows);
        res.json({data: result.rows });
    } catch (err) {
        console.error('Error connecting to the database', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// app.post('/reportcrime', async (req, res) => {
//     try {
//         const { title, description, image } = req.body;
//         const result = await pool.query('INSERT INTO CRIMEREPORTED VALUES($1, $2, $3) RETURNING *', [title, description,image]);
//         console.log(result.rows);
//         res.json({data: result.rows });
//     } catch (err) {
//         console.error('Error connecting to the database', err);
//         res.status(500).json({ error: 'Database connection failed' });
//     }
// });


app.listen(3000, () => console.log('Server running on port 3000'));
