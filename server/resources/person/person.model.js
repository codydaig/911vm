const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
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
    type: 'date',
    empty: true,
  },
  end_date: {
    type: 'date',
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
  joined_at: {
    type: 'number',
    required: false,
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
        type: 'number',
        required: true
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