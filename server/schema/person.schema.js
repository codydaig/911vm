const uuidv4 = require('uuid/v4');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
    default: () => uuidv4(),
  },
  radio_id: {
    type: 'string',
    empty: true,
  },
  first_name: {
    type: 'name',
    required: true,
  },
  last_name: {
    type: 'name',
    required: true,
  },
  email_address: {
    type: 'email',
    required: true,
    unique: true,
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
    type: 'number',
    empty: true,
  },
  end_date: {
    type: 'number',
    empty: true,
  },
  is_admin: {
    type: 'boolean',
    default: false,
  },
  is_volunteer: {
    type: 'boolean',
    default: false,
  },
  is_active: {
    type: 'boolean',
    default: true,
  },
  has_certification: {
    type: 'relationship',
    relationship: 'HAS_CERTIFICATION',
    direction: 'out',
    'cascade': 'detach',
    properties: {
      expriation_date: {
        type: 'number',        
      },
      signature_person_id: {
        type: 'string',
      },
      signature_person_name: {
        type: 'string',
      },
      signature_date: {
        type: 'number',
      }
    }
  }  
}

module.exports = schema;