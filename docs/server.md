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
`npm seed`

## Earse database
`npm dropDB`

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
