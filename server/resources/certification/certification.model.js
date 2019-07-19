const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true,
  },
  name: {
    type: 'string',
    unique: true,
  },
  is_active: {
    type: 'boolean',
    default: true,
  },
  created_at: {
    type: 'number',
    default: () => (new Date).getTime(),
  }
}
    
module.exports = schema;