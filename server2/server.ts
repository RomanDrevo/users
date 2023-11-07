import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';






const app = express();
const PORT = process.env.PORT || 3000;


// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

interface User {
    id: number;
    username: string;
    password: string;
}

interface RequestWithUser extends Request {
    user?: any; // Replace 'any' with your User payload type from JWT
}

// Mock user database
const users: User[] = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

// Secret key for JWT signing and encryption
const secretKey = 'your-256-bit-secret';

// Middleware to check if the request has a valid JWT token
function authenticateToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// POST /login route to authenticate a user and send back a token
app.post('/loginf', (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
            expiresIn: '1h'
        });

        res.json({ token });
    } else {
        res.status(401).send('Username or password incorrect');
    }
});

// GET /users route to return a list of users, requires authorization
app.get('/users', authenticateToken, (req: RequestWithUser, res: Response) => {
    const sanitizedUsers = users.map(({ password, ...user }) => user);
    res.json(sanitizedUsers);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
