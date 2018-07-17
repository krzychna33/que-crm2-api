# _QueCRM2_ RestAPI

## SETUP

**Environment: Mongodb, nodejs**

1. set up your .env file
2. Install dependencies
3. start app by lauching server.js file


##Routes

for authentication please add a header to request: **x-auth** - value for this header you
can get from **_POST /api/v1/users/login_**

### 1. Authentication
**POST /api/v1/users/login**


    {
              "email": "admin@admin.io",
              "password": "admin123"
    }
    
**POST /api/v1/users/**

    {
        "email": "admin@admin.io",
        "password": "admin123"
    }
    
**GET /api/v1/users/me**

**DELETE /api/v1/users/logout**

### 2. Clients

**GET /api/v1/clients/5b4e01933991180708501704**

**GET /api/v1/clients/**

**POST /api/v1/clients/**

    {
        "firstName": "KRzysiek",
        "lastName": "Admin",
        "email": "client@test.io"
    }
    
**PUT /api/v1/clients/5b4e01933991180708501704**

    {
        "firstName": "KRzysiek",
        "lastName": "Admin",
        "email": "client@test.io"
    }
    
**DELETE /api/v1/clients/5b4e01933991180708501704**