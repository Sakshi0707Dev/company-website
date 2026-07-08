const catchAsync = require('../utils/catchAsync');
const enquiryService = require('../services/enquiryService');

const create = catchAsync(async (req, res, next) => {
  const enquiry = await enquiryService.createEnquiry(req.body);
  res.status(201).json({ success: true, enquiry });
});

const list = catchAsync(async (req, res, next) => {
  const result = await enquiryService.listEnquiries(req.query);
  res.status(200).json({ success: true, ...result });
});

const getById = catchAsync(async (req, res, next) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);
  res.status(200).json({ success: true, enquiry });
});

const update = catchAsync(async (req, res, next) => {
  const enquiry = await enquiryService.updateEnquiry(req.params.id, req.body);
  res.status(200).json({ success: true, enquiry });
});

const remove = catchAsync(async (req, res, next) => {
  await enquiryService.deleteEnquiry(req.params.id);
  res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
});

module.exports = { create, list, getById, update, remove };
