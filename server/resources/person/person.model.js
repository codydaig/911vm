const uuidv4 = require('uuid/v4');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
    default: () => uuidv4(),
  },
  raido_id: {
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
  created_at: {
    type: 'number',
    default: () => (new Date).getTime(),
  },
  has_certification: {
    type: 'relationship',
    relationship: 'HAS_CERTIFICATION',
    direction: 'out',
    'cascade': 'detach',
    properties: {
      expired_at: {
        type: 'number'
      },
      created_at: {
        type: 'number',
        default: () => (new Date).getTime(),
      },
    }
  },
  signs_certification: {
    type: 'relationship',
    relationship: 'SIGNS_CERTIFICATION',
    direction: 'out',
    'cascade': 'detach',
    properties: {
      person_id: {
        type: 'string',
        required: true,
      }, 
      created_at: {
        type: 'number',
        default: () => (new Date).getTime(),
      },
      signed_at: {
        type: 'number',
        required: true,
      }
    }
  }  
}

module.exports = schema;