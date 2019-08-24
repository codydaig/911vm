const neode = require('../schema/index');

let Signatures = {};

Signatures.create = ({personId, certificationId, signaturePersonId}) => {
  return Promise.all([
    neode.first('Person', 'id', personId),
    neode.first('Certification', 'id', certificationId)
  ])
  .then(([person, certification]) => {
    return person.relateTo(certification, 'has_certification_signature', {
      signature_person_id: signaturePersonId,
      signature_date: (new Date()).getTime()
    })
  })
  .then((data) => {
    return {signaturePersonId: data.get('signature_person_id'), signatureDate: data.get('signature_date'), certificationId: certificationId}
  })
}

module.exports = Signatures;