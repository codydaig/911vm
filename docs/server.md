# Neo4j Installation
There are two version of Neo4j, either which will work.  Both have dependence on Java being installed.  If you install the desktop edition from the neo4j website, it will take care of the Java installation for you.

## Desktop Edition
1. Download the Neo4j Desktop Edition [download](https://neo4j.com/download/)

2. Open the application and follow prompts to create a user account and password for the Neo4j server.

3. Start the Neo4j server from the desktop application.

Here is the link to the Neo4j product page and overview. [link](https://neo4j.com/product/#neo4j-desktop)


## Community Edition
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
1. Create a .env file at the parent most folder (same level as package.json)
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

Status code: 200

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

Status code: 200
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

Status code: 200

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

Status code: 200

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

Status code: 200

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

Status code: 200

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

Status code: 200

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
  expriation_date: dateString, // for example '2019-02-23'   
}
```

Response

Status code: 200

`{message: "Relationship created"}`

Status code: 404

`{error_message: 'error message'}`

### Get a volunteer's certifications

`GET /api/person/:id/certification`

Response

Status code: 200

```
{
  "data": [
    {
      "certification": {
        "name": "EMT Basic",
        "id": "6cdd2fea-9c55-4dcc-bbf3-5b20072bb4e1",
        "expired_at": 1579766400000,
        "expriation_date": {
          "signature_date": null,
          "signature_person_id": null
        }
      }
    },
    {
      "certification": {
        "name": "CPR Instructor",
        "id": "15430721-54a7-4fe0-9c9d-4b978534743f",
        "expriation_date": 1561878000000,
        "sign_off": {
          "signature_date": null,
          "signature_person_id": null
        }
      }
    },
    {
      "certification": {
        "name": "EMR Instructor",
        "id": "2cce4915-8b90-48e0-8f77-bc9aa1a98dd3",
        "expriation_date": 1533020400000,
        "sign_off": {
          "signature_date": null,
          "signature_person_id": null
        }
      }
    },
    {
      "certification": {
        "name": "CPR",
        "id": "5012a32e-dd57-4b08-8bad-93c285932f86",
        "expriation_date": 1561878000000,
        "sign_off": {
          "signature_date": 1525158000000,
          "signature_person_id": "64db2d75-8a8b-4409-8b49-3d9271c84f0d",
        }
      }
    }
  ]
}
```

Status code: 404

`{error_message: 'error message'}`
