const Enquiry = require('../models/Enquiry');
const AppError = require('../utils/AppError');

const createEnquiry = async (data) => {
  return Enquiry.create(data);
};

const listEnquiries = async (query) => {
  const {
    search,
    page = 1,
    limit = 10,
    sort = '-createdAt',
  } = query;

  const filter = {};

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { name: regex },
      { email: regex },
      { subject: regex },
      { message: regex },
      { phone: regex },
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort(sort).skip(skip).limit(limitNum),
    Enquiry.countDocuments(filter),
  ]);

  return {
    enquiries,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum),
    },
  };
};

const getEnquiryById = async (id) => {
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }
  return enquiry;
};

const updateEnquiry = async (id, data) => {
  const enquiry = await Enquiry.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }
  return enquiry;
};

const deleteEnquiry = async (id) => {
  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) {
    throw new AppError('Enquiry not found', 404);
  }
  return enquiry;
};

module.exports = {
  createEnquiry,
  listEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
