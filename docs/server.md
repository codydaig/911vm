# Neo4j Installation
1. Download the [Community Server Edition](https://neo4j.com/download-center/#community)
2. Open up your terminal/shell
3. Extract the contents of the archive, using: `tar -xf <filecode>`.  For example, `tar -xf neo4j-community-3.5.8-unix.tar.gz`
4. Place the extracted files in a permanent home on your server. The top level directory is referred to as NEO4J_HOME.
  - To run Neo4j as a console application, use: `<NEO4J_HOME>/bin/neo4j console`
  - To run Neo4j in a background process, use: `<NEO4J_HOME>/bin/neo4j start`
5. Visit [http://localhost:7474](http://localhost:7474) in your web browser.
6. Connect using the username 'neo4j' with default password 'neo4j'. You'll then be prompted to change the password.

Once you create a new password for the 'neo4j' user upon visiting the Neo4j Browser the first time, you'll have full access to the Neo4j database.

# Neo4j configuration
1. Create a .env file
2. Setup the .env file
    ```
    // .env
    NEO4J_PROTOCOL=bolt
    NEO4J_HOST=localhost
    NEO4J_USERNAME=neo4j
    NEO4J_PASSWORD=YOUR_PASSWORD
    NEO4J_PORT=7687
    ```

## Getting Started
1. Make sure your neo4j database is upon running
2. `npm start`

## Seed database
`npm run seed`

## Earse database
`npm run dropDB`

# Resources
## Certification

### List of all certifications
`GET /api/certifcation`

Response

Status code: 202

```
{
  data: [
    {
      id: 'id', 
      name: 'name', 
      is_active: true, 
      will_expire: true 
    }
  ]
}
```
Status code: 404

`{error_message: 'error message'}`

### Create a new certification
`POST /api/certification`

Request

```
{
  name: string, // required
  is_active: boolean, 
  will_expire: boolean,
}
```

Response

Status code: 202
```
{
  data: {
    id: 'id', 
    name: 'name', 
    is_active: true, 
    will_expire: true 
  }
}
```

Status code: 404

`{error_message: 'error message'}`

## Person (volunteer)
### List all volunteers

`GET /api/person`

Status code: 202

```
{
  data: [
    {
      id: 'id', 
      first_name: 'first_name', 
      last_name: 'last_name', 
      email_address: 'email_address', 
      phone_number: 'phone_number', 
      class: 'class', 
      start_date: 'start_date', 
      end_date: 'end_date', 
      is_admin: true, 
      is_volunteer: true 
    }
  ]
}
```

Status code: 404

`{error_message: 'error message'}`

### Create new volunteer

`POST /api/person`

Request

```
{
  first_name: string, // required
  last_name: string, // required
  email_address: string, // required
  phone_number: string,
  class: string , 
  start_date: milliseconds, 
  end_date: milliseconds, 
  is_admin: boolean, 
  is_volunteer: boolean   
}
```

Response

Status code: 202

```
{
  data: {
      id: 'id', 
      first_name: 'first_name', 
      last_name: 'last_name', 
      email_address: 'email_address', 
      phone_number: 'phone_number', 
      class: 'class', 
      start_date: 'start_date', 
      end_date: 'end_date', 
      is_admin: true, 
      is_volunteer: true 
  }
}
```

Status code: 404

`{error_message: 'error message'}`

### Update volunteer

`PUT /api/person/:id`

Request

```
{
  first_name: string, // required
  last_name: string, // required
  email_address: string, // required
  phone_number: string,
  class: string , 
  start_date: milliseconds, 
  end_date: milliseconds, 
  is_admin: boolean, 
  is_volunteer: boolean   
}
```

Response

Status code: 202

```
{
  data: {
      id: 'id', 
      first_name: 'first_name', 
      last_name: 'last_name', 
      email_address: 'email_address', 
      phone_number: 'phone_number', 
      class: 'class', 
      start_date: 'start_date', 
      end_date: 'end_date', 
      is_admin: true, 
      is_volunteer: true 
  }
}
```

Status code: 404

`{error_message: 'error message'}`

### Show a volunteer

`GET /api/person/:id`

Response

Status code: 202

```
{
  data: {
      id: 'id', 
      first_name: 'first_name', 
      last_name: 'last_name', 
      email_address: 'email_address', 
      phone_number: 'phone_number', 
      class: 'class', 
      start_date: 'start_date', 
      end_date: 'end_date', 
      is_admin: true, 
      is_volunteer: true 
  }
}
```

Status code: 404

`{error_message: 'error message'}`

### Delete a volunteer

`DELETE /api/person/:id`

Response

Status code: 202

```
{
  data: {
      Successfully deleted [personId]
  }
}
```

Status code: 404

`{error_message: 'error message'}`

## Person Certification
### Add a certification to a volunteer

`POST /api/person/:id/certification`

Request

```
{
  certification_id: string, // required
  expired_at: dateString, // for example '2019-02-23'   
}
```

Response

Status code: 202

`{message: "Relationship created"}`

Status code: 404

`{error_message: 'error message'}`

### Get a volunteer's certifications

`GET /api/person/:id/certification`

Response

Status code: 202

```
{
  data: {
    id: 'certification_id',
    name: 'certification_name',
    expired_at: milliseconds
  }
}
```

Status code: 404

`{error_message: 'error message'}`


### Get a volunteer's certification with sign offs

`GET /api/person/:id/signoff`

Response

Status code: 202

```
{
    "data": [
        {
            "sign_off": {
                "email_address": "cody.daig@leu-rescue.org",
                "last_name": "Daig",
                "phone_number": "720-340-2319",
                "id": "ddb25135-32e7-42bc-9368-31a20017a2a8",
                "first_name": "Cody",
                "class": "Probationary"
            },
            "certification": {
                "name": "CPR",
                "id": "734ad2c0-9b92-4182-be0e-d90aae18b5f8",
                "expired_at": 1561878000000
            }
        },
        {
            "sign_off": {
                "email_address": "leslie.coburn@leu-rescue.org",
                "last_name": "Leslie",
                "phone_number": "720-226-1457",
                "id": "910fb13e-5c3f-4459-995f-18dfc53eb5c0",
                "first_name": "Coburn",
                "class": "Trainee"
            },
            "certification": {
                "name": "EMT Basic",
                "id": "76998731-bff5-4160-87d9-72ea38ebe06e",
                "expired_at": 1579852800000
            }
        }
    ]
}
```

Status code: 404

`{error_message: 'error message'}`
