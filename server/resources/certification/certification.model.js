const schema = {
  id: {
    primary: true,
    type: 'uuid',
    required: true, // Creates an Exists Constraint in Enterprise mode
  },
  name: {
    type: 'string',
    required: true,
  },    
  created_at: {
    type: 'number',
    default: () => (new Date).getTime(),
  }
}
  
  module.exports = schema;