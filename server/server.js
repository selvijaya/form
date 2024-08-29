const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database configuration

const dbConfig = {
    user: 'form',
    password: 'form123',
    server: 'DESKTOP-NBR22UQ',
    database: 'form',
    options: {
        encrypt: true, // for Azure SQL
        trustServerCertificate: true // change to true for local development
    }
};


sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('Database connected successfully');
    }
});


// API routes

app.get('/api/callHistory', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM call_history');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.get('/api/accountDetails', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM account_details');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.get('/api/loanDetails', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM loan_details');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.get('/api/profileDetails', async (req, res) => {
    const { FullName, Id } = req.query;
    if (!FullName || !Id) {
        return res.status(400).json({ error: 'Name and ID are required' });
    }

    try {
        const request = new sql.Request();
        request.input('FullName', sql.NVarChar, FullName);
        request.input('Id', sql.Int, Id);

        const result = await request.query(`
            SELECT * FROM ProfileDetails
            WHERE FullName = @FullName AND Id = @Id
        `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No profile found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.put('/api/profileDetails/:Id', async (req, res) => {
    const { Id } = req.params;
    const { FullName, Email, Address, PhoneNumber, AccountNumber, AccountType, IFSCCode, Branch } = req.body;
    
    try {
        const request = new sql.Request();
        request.input('FullName', sql.NVarChar, FullName);
        request.input('Email', sql.NVarChar, Email);
        request.input('Address', sql.NVarChar, Address);
        request.input('PhoneNumber', sql.NVarChar, PhoneNumber);
        request.input('AccountNumber', sql.NVarChar, AccountNumber);
        request.input('AccountType', sql.NVarChar, AccountType);
        request.input('IFSCCode', sql.NVarChar, IFSCCode);
        request.input('Branch', sql.NVarChar, Branch);
        request.input('Id', sql.Int, Id);

        const result = await request.query(`
            UPDATE ProfileDetails
            SET FullName = @FullName, Email = @Email, Address = @Address, PhoneNumber = @PhoneNumber,
                AccountNumber = @AccountNumber, AccountType = @AccountType, IFSCCode = @IFSCCode, Branch = @Branch
            WHERE Id = @Id
            SELECT * FROM ProfileDetails WHERE Id = @Id
        `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.delete('/api/accountDetails/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await sql.query`DELETE FROM account_details WHERE id = ${id}`;
  
      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ message: 'Server error' });
    }
});


app.delete('/api/call_history/:call_id', async (req, res) => {
    const { call_id } = req.params;
    try {
        const result = await sql.query`DELETE FROM call_history WHERE call_id = ${call_id}`;
    
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.delete('/api/loan_details/:account_id', async (req, res) => {
    const { account_id } = req.params;
    try {
        const result = await sql.query`DELETE FROM loan_details WHERE account_id = ${account_id}`;
    
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
