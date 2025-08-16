# Backend API Documentation

## Endpoints

### POST /users/register

#### Description
This endpoint is used to register a new user.

#### Request Body
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email and at least 5 characters long.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- 201 Created
  - Description: User successfully registered.
  - Body: A JSON object containing the authentication token and user details.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- 400 Bad Request
  - Description: Validation errors or missing required fields.
  - Body: A JSON object containing the validation errors.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 character long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

### POST /captains/register

#### Description
This endpoint is used to register a new captain.

#### Request Body
The request body should be a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "John", // string, required, min length: 3
    "lastname": "Doe" // string, required
  },
  "email": "john.doe@example.com", // string, required, must be a valid email
  "password": "password123", // string, required, min length: 6
  "vehicle": {
    "vehicleType": "car", // string, required, must be one of 'car', 'motorcycle', 'auto'
    "plate": "ABC123", // string, required, min length: 3
    "color": "red", // string, required, min length: 3
    "capacity": 4 // number, required, min value: 1
  }
}
```

#### Responses

- 201 Created
  - Description: Captain successfully registered.
  - Body: A JSON object containing the captain details.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "captain": {
        "_id": "captain_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "plate": "ABC123",
          "color": "red",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- 400 Bad Request
  - Description: Validation errors or missing required fields.
  - Body: A JSON object containing the validation errors.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

### POST /captains/login

#### Description
This endpoint is used to log in an existing captain.

#### Request Body
The request body should be a JSON object with the following fields:

```json
{
  "email": "john.doe@example.com", // string, required, must be a valid email
  "password": "password123" // string, required, min length: 6
}
```

#### Responses

- 200 OK
  - Description: Captain successfully logged in.
  - Body: A JSON object containing the authentication token and captain details.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "captain": {
        "_id": "captain_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "plate": "ABC123",
          "color": "red",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- 400 Bad Request
  - Description: Validation errors or missing required fields.
  - Body: A JSON object containing the validation errors.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- 401 Unauthorized
  - Description: Invalid email or password.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### GET /captains/profile

#### Description
This endpoint is used to retrieve the current captain's profile information.

#### Headers
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses

- 200 OK
  - Description: Successfully retrieved captain profile.
  - Body: A JSON object containing the captain details.
  - Example:
    ```json
    {
      "captain": {
        "_id": "captain_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "plate": "ABC123",
          "color": "red",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- 401 Unauthorized
  - Description: Authentication required.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "message": "Authentication required"
    }
    ```

### GET /captains/logout

#### Description
This endpoint is used to log out the current captain and invalidate their token.

#### Headers
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses

- 200 OK
  - Description: Successfully logged out.
  - Body: A JSON object containing the success message.
  - Example:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- 401 Unauthorized
  - Description: Authentication required.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "message": "Authentication required"
    }
    ```

### POST /users/login

#### Description
This endpoint is used to log in an existing user.

#### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the user. Must be a valid email.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Responses

- 200 OK
  - Description: User successfully logged in.
  - Body: A JSON object containing the authentication token and user details.
  - Example:
    ```json
    {
      "token": "jwt_token_here",
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```

- 400 Bad Request
  - Description: Validation errors or missing required fields.
  - Body: A JSON object containing the validation errors.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- 401 Unauthorized
  - Description: Invalid email or password.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

### GET /users/profile

#### Description
This endpoint is used to retrieve the current user's profile information.

#### Headers
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses

- 200 OK
  - Description: Successfully retrieved user profile.
  - Body: A JSON object containing the user details.
  - Example:
    ```json
    {
      "success": true,
      "user": {
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id_here"
      }
    }
    ```

- 401 Unauthorized
  - Description: Authentication required.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "success": false,
      "message": "Authentication required"
    }
    ```

### POST /users/logout

#### Description
This endpoint is used to log out the current user and invalidate their token.

#### Headers
```json
{
  "Authorization": "Bearer <token>"
}
```

#### Responses

- 200 OK
  - Description: Successfully logged out.
  - Body: A JSON object containing the success message.
  - Example:
    ```json
    {
      "success": true,
      "message": "Logged out successfully"
    }
    ```

- 401 Unauthorized
  - Description: Authentication required.
  - Body: A JSON object containing the error message.
  - Example:
    ```json
    {
      "success": false,
      "message": "Authentication required"
    }
    ```