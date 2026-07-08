const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const env = require('../config/env');

let token;

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(env.MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('API Tests', () => {
  describe('GET /api/health', () => {
    it('should return server health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Server is running');
    });
  });

  describe('Contact Form - POST /api/enquiries', () => {
    const validEnquiry = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Test Enquiry',
      message: 'This is a test message for the enquiry form.',
    };

    it('should create a new enquiry with valid data', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send(validEnquiry);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.enquiry.name).toBe('John Doe');
    });

    it('should reject enquiry with missing name', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({ ...validEnquiry, name: '' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject enquiry with invalid email', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({ ...validEnquiry, email: 'not-an-email' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject enquiry with short message', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({ ...validEnquiry, message: 'Short' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Auth - POST /api/auth/login', () => {
    it('should reject login without credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'invalid', password: 'password123' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Protected Routes', () => {
    it('should reject requests without token', async () => {
      const res = await request(app).get('/api/enquiries');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject requests with invalid token', async () => {
      const res = await request(app)
        .get('/api/enquiries')
        .set('Authorization', 'Bearer invalid_token');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject malformed token gracefully', async () => {
      const res = await request(app)
        .get('/api/enquiries')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImlhdCI6MTUxNjIzOTAyMn0');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('CRUD Operations (authenticated)', () => {
    let enquiryId;

    beforeAll(async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'admin@company.com', password: 'Admin@123' });
      token = loginRes.body.token;

      const res = await request(app)
        .post('/api/enquiries')
        .send({
          name: 'CRUD Test',
          email: 'crud@test.com',
          phone: '+1 (555) 000-0000',
          subject: 'CRUD Test Subject',
          message: 'This is a CRUD test message that is long enough.',
        });
      enquiryId = res.body.enquiry?._id;
    });

    it('should read created enquiry', async () => {
      if (!token || !enquiryId) return;
      const res = await request(app)
        .get(`/api/enquiries/${enquiryId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.enquiry.name).toBe('CRUD Test');
    });

    it('should search enquiries', async () => {
      if (!token) return;
      const res = await request(app)
        .get('/api/enquiries?search=CRUD')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.enquiries)).toBe(true);
    });

    it('should update enquiry', async () => {
      if (!token || !enquiryId) return;
      const res = await request(app)
        .put(`/api/enquiries/${enquiryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'CRUD Test Updated' });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.enquiry.name).toBe('CRUD Test Updated');
    });

    it('should delete enquiry', async () => {
      if (!token || !enquiryId) return;
      const res = await request(app)
        .delete(`/api/enquiries/${enquiryId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Enquiry deleted successfully');
    });
  });

  describe('Logout', () => {
    it('should require authentication for logout', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).toBe(401);
    });
  });

  describe('Validation', () => {
    it('should reject invalid phone number', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({
          name: 'Test',
          email: 'test@test.com',
          phone: 'abc',
          subject: 'Test Subject',
          message: 'Test message that is long enough.',
        });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject missing required fields', async () => {
      const res = await request(app)
        .post('/api/enquiries')
        .send({});
      expect(res.status).toBe(400);
    });
  });
});
