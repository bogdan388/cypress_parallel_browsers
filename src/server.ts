import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';

interface User {
  username: string;
  password: string;
  displayName: string;
}

interface Users {
  [key: string]: User;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface TextChangeData {
  text: string;
}

interface ExtendedSocket extends Socket {
  username?: string;
}

const app = express();
const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users: Users = {
  'user1': { username: 'user1', password: 'SecurePass123!@#', displayName: 'Alice' },
  'user2': { username: 'user2', password: 'StrongPass456$%^', displayName: 'Bob' }
};

let sharedText: string = '';
const connectedUsers = new Set<string>();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    res.json({
      success: true,
      username: user.username,
      displayName: user.displayName
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

io.on('connection', (socket: ExtendedSocket) => {
  console.log('A user connected');

  socket.emit('text-update', sharedText);

  socket.on('user-join', (username: string) => {
    socket.username = username;
    connectedUsers.add(username);
    io.emit('users-update', Array.from(connectedUsers));
    console.log(`${username} joined the session`);
  });

  socket.on('text-change', (data: TextChangeData) => {
    sharedText = data.text;
    socket.broadcast.emit('text-update', sharedText);
    console.log(`Text updated by ${socket.username}`);
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      connectedUsers.delete(socket.username);
      io.emit('users-update', Array.from(connectedUsers));
      console.log(`${socket.username} disconnected`);
    }
  });
});

const PORT: number = 3000;
http.listen(PORT, 'localhost', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nAvailable users:');
  console.log('  Username: user1, Password: SecurePass123!@#');
  console.log('  Username: user2, Password: StrongPass456$%^');
  console.log('\nOpen two different browsers and login with different users!');
});