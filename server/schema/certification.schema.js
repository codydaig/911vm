const uuidv4 = require('uuid/v4');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
    default: () => uuidv4(),
  },
  name: {
    type: 'string',
    unique: 'true',
  },
  is_active: {
    type: 'boolean',
    default: true,
  },
  will_expire: {
    type: 'boolean',
    default: true,
  },
  created_at: {
    type: 'number',
    default: () => (new Date).getTime(),
  }
}
    
module.exports = schema;