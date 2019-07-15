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
  created_at: {
    type: 'datetime',
    default: () => new Date,
  },
  has_certification: {
    type: 'relationship',
    relationship: 'HAS_CERTIFICATION',
    direction: 'out',
    properties: {
      created_at: {
        type: 'date',
        default: () => new Date,
      }, 
      expirated_at: {
        type: 'date',
        required: true,
      }
    }
  },
  signs_certification: {
    type: 'relationship',
    relationship: 'SIGNS_CERTIFICATION',
    direction: 'out',
    properties: {
      created_at: {
        type: 'date',
        default: () => new Date,
      },
      signed_at: {
        type: 'date',
        required: true,
      },
      person_id: {
        type: 'uuid',
        required: true,        
      }
    }
  }  
}

module.exports = schema;