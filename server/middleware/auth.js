const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const env = require('../config/env');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array().map((e) => e.msg).join(', '),
    });
  }
  next();
};

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    return next(new AppError('Admin belonging to this token no longer exists', 401));
  }

  req.admin = admin;
  next();
});

module.exports = { protect, handleValidationErrors };
