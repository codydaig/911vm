const uuidv4 = require('uuid/v4');

const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
    default: () => uuidv4(),
  },
  signature_date: {
    type: 'number',
  },
  signature_person_id: {
    type: 'string',
  },
}

module.exports = schema;