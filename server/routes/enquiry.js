const express = require('express');
const router = express.Router();
const {
  create,
  list,
  getById,
  update,
  remove,
} = require('../controllers/enquiryController');
const { protect, handleValidationErrors } = require('../middleware/auth');
const {
  createEnquiryValidator,
  updateEnquiryValidator,
} = require('../validators/enquiry');

router.post('/', createEnquiryValidator, handleValidationErrors, create);
router.get('/', protect, list);
router.get('/:id', protect, getById);
router.put('/:id', protect, updateEnquiryValidator, handleValidationErrors, update);
router.delete('/:id', protect, remove);

module.exports = router;
