const RecordsHelper = {};


RecordsHelper.recordsPath = () => `/records`;
RecordsHelper.recordPath = (id) => `/records/${id}`;


RecordsHelper.newrecordPath = () => `/records/new`;
RecordsHelper.editrecordPath = () => `/records/edit`;
RecordsHelper.destroyrecordPath = () => `/records?_method=delete`;
RecordsHelper.updaterecordPath = () => `/records?_method=put`;

RecordsHelper.newBloodSugarPath = () => `/records/bloodsugar`;


module.exports = RecordsHelper;