const schema = {
  name: {
    type: 'string',
    required: true,
    unique: true,
  },    
  created_at: {
    type: 'number',
    default: () => (new Date).getTime(),
  }
}
  
  module.exports = schema;