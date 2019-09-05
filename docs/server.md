# Neo4j Installation
There are two version of Neo4j, either which will work.  Both have dependence on Java being installed.  If you install the desktop edition from the neo4j website, it will take care of the Java installation for you.

## Desktop Edition
1. Download the Neo4j Desktop Edition [download](https://neo4j.com/download/)
1. Open the application and create a new project.
1. Add A Graph to the project. The password you set is the NEO4J password that will go in the .env file in further steps.
1. Start the Neo4j server from the desktop application.

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
  "data": {
    "person": {
      "email_address": "marcel.macphail@leu-rescue.org",
      "last_name": "MacPhail",
      "phone_number": null,
      "id": "6d8c77cc-2e30-47e1-89cf-ba6bb8653103",
      "first_name": "Marcel",
      "class": "Probationary",
      "start_date": null
    },
    "certifications": [
      {
        "signature_date": null,
        "signature_person_id": null,
        "name": "EMT Intermidiate",
        "id": "0dcd97b6-c130-4dc5-ad79-1956c08105cd",
        "expriation_date": null,
        "signature_person_name": null
      },
      {
        "signature_date": "2019-08-26",
        "signature_person_id": "945bb267-4456-489c-a5fc-d12f1009aea3",
        "name": "CPR Instructor",
        "id": "e022b939-1376-4ecb-8109-bae77c0ef191",
        "expriation_date": null,
        "signature_person_name": "Cody Daig"
      }
    ]
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
### Add a certification to a volunteer with a signature

`POST /api/person/:id/certification`

Request

```
{
  "certification_id": string // required,
  "expriation_date": date string // YYYY-MM-DD not required
  "signature_person_id": string // required
  "signature_date": date string // YYYY-MM-DD not required
}
```

Response

Status code: 200

`{message: "Relationship created"}`

Status code: 404

`{error_message: 'error message'}`


### Update a signature data or certification expriation
`PUT /api/person/:id/certification/:certification_id`

There are 3 fields we can update, expriation_date, signature_person_id, and signature_date

Request

```
{
  "expriation_date": date string // YYYY-MM-DD not required
	"signature_person_id": string // not required
	"signature_date": date string // YYYY-MM-DD not required
}
```

Response

Status code: 200

```
{
  "data": {
    "signature_person_name": "Cody Daig",
    "signature_person_id": "945bb267-4456-489c-a5fc-d12f1009aea3",
    "signature_date": 1566883979108,
    "expriation_date": 1575158400000
  }
}
```

Status code: 404

`{error_message: 'error message'}`