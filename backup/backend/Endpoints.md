# User Creation

# Endpoint

The endpoint for creating a user is: 
```POST /auth/users/```

##Request Body
For each user type, you need to provide the necessary fields in the request body. Here is an example for each user type:
### Agent
```
{
  "email": "agent@example.com",
  "name": "Agent Name",
  "password": "password123",
  "role": "agent"
}
```
### Buyer
```
{
  "email": "buyer@example.com",
  "name": "Buyer Name",
  "password": "password123",
  "role": "buyer"
}

```
### Seller
```
{
  "email": "seller@example.com",
  "name": "Seller Name",
  "password": "password123",
  "role": "seller"
}
```
### Owner
```
{
  "email": "owner@example.com",
  "name": "Owner Name",
  "password": "password123",
  "role": "owner"
}
```
### Lawyer
```
{
  "email": "lawyer@example.com",
  "name": "Lawyer Name",
  "password": "password123",
  "role": "lawyer"
}
```
### Manager
```
{
  "email": "manager@example.com",
  "name": "Manager Name",
  "password": "password123",
  "role": "manager"
}
```
### Supplier
```
{
  "email": "supplier@example.com",
  "name": "Supplier Name",
  "password": "password123",
  "role": "supplier"
}
```
