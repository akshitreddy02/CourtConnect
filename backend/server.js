import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
const PORT = 3008;

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/evault');

// Define a User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    lawyerid: Number,
    clientid: Number
});

const dataschema = new mongoose.Schema({
    caseName: String,
    caseDescription: String,
    clientid: Number,
    lawyerid: Number,
    isaccepted: {
        type: Boolean,
        default: false
    },
    judgment: {
        type: String,
        default: null
    },
    file: {
        data: Buffer,
        contentType: String
    },
    filename: String
});

const login = mongoose.model('login', userSchema);
const cases = mongoose.model('cases', dataschema);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request with username:', username, password);
    try {
        // Find the user in the database
        const Login = await login.findOne({ username });
        console.log('Found user:', Login);

        if (Login) {

            // Return user role in the response
            res.json({ user: Login });
        } else {
            // Return an error if the credentials are invalid
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/lawyer-cases/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { caseDescription } = req.body;

    try {
        const updatedCase = await cases.findByIdAndUpdate(
            id,
            { $set: { caseDescription } },
            { new: true }
        );
        res.json(updatedCase);
    } catch (error) {
        console.error('Error updating case description:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.post('/cases', upload.single('file'), async (req, res) => {
    const { caseName, caseDescription, clientid, lawyerid, filename } = req.body;

    try {
        const newCase = new cases({
            caseName,
            caseDescription,
            caseName,
            clientid,
            lawyerid,
            file: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            filename
        });

        const savedCase = await newCase.save();
        res.json(savedCase);
    } catch (error) {
        console.error('Error saving case:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






app.get('/lawyers', async (req, res) => {
    try {
        const lawyerList = await login.find({ role: 'lawyer' }, 'lawyerid username');
        res.json(lawyerList);
    } catch (error) {
        console.error('Error fetching lawyers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/files/:clientid', async (req, res) => {
    const { clientid } = req.params;

    try {
        const caseData = await cases.findOne({ clientid });

        console.log(caseData)

        if (!caseData || !caseData.file) {
            return res.status(404).json({ error: 'File not found' });
        }

        console.log(caseData.file)
        res.writeHead(200, {
            'Content-Type': caseData.file.contentType,
            'Content-Disposition': `attachment; filename="${caseData.filename}"`,
        });


        res.end(caseData.file.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





app.get('/cases', async (req, res) => {
    const { clientid } = req.query;

    try {
        const existingCase = await cases.find({ clientid });
        res.json(existingCase);
    } catch (error) {
        console.error('Error fetching existing case:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/lawyer-cases', async (req, res) => {
    const { lawyerid } = req.query;

    try {
        const lawyerCases = await cases.find({ lawyerid });
        res.json(lawyerCases);
    } catch (error) {
        console.error('Error fetching lawyer cases:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/lawyer-cases/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCase = await cases.findByIdAndUpdate(id, { isaccepted: true });
        res.json(updatedCase);
    } catch (error) {
        console.error('Error updating case:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/lawyer-cases/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await cases.findByIdAndDelete(id);
        res.json({ message: 'Case declined and deleted successfully' });
    } catch (error) {
        console.error('Error declining case:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/accepted-cases', async (req, res) => {
    try {
        const acceptedCases = await cases.find({ isaccepted: true });
        res.json(acceptedCases);
    } catch (error) {
        console.error('Error fetching accepted cases:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.patch('/accepted-cases/:id', async (req, res) => {
    const { id } = req.params;
    const { judgment } = req.body;

    try {
        const updatedCase = await cases.findByIdAndUpdate(id, { judgment }, { new: true });
        res.json(updatedCase);
    } catch (error) {
        console.error('Error updating judgment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
