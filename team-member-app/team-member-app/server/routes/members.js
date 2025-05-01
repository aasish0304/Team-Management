const express = require('express');
const router = express.Router();
const multer = require('multer');
const Member = require('../models/Member');
const path = require('path');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// POST /api/members - Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email } = req.body;
    const image = req.file.filename;

    const newMember = new Member({ name, role, email, image });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Error saving member", error });
  }
});

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching members", error });
  }
});

// GET /api/members/:id - Get member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Error fetching member", error });
  }
});

module.exports = router;
