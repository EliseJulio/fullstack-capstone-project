curl -X POST http://localhost:5000/api/login   -H "Content-Type: application/json"   -d '{"email":"jane@example.com","password":"secret123"}'

Output:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "64f5d0e7e5346b1c118e3c12",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
