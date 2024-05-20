const Yup = require('yup');

const stockSchema = Yup.object({
    q: Yup.string().required('Stock code is a required field')
});

module.exports = { stockSchema };