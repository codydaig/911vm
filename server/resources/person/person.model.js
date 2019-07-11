const schema = {
  person_id: {
    primary: true,
    type: 'uuid',
    required: true, // Creates an Exists Constraint in Enterprise mode
  },
  first_name: {
    type: 'name',
    required: true,
  },
  last_name: {
    type: 'name',
    required: true,
  },
  email: {
    type: 'email',
    required: true,
  },
  phone_number: {
    type: 'string',
    empty: true,
  },
  class: {
    type: 'string',
    empty: true,
  },
  start_date: {
    type: 'date',
    empty: true,
  },
  end_date: {
    type: 'date',
    empty: true,
  },
  is_admin: {
    type: 'boolean',
    required: true,
  },
  is_volunteer: {
    type: 'boolean',
    required: true,
  },
}

module.exports = schema;