const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ dateApplied: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new application
router.post('/', async (req, res) => {
  const application = new Application({
    companyName: req.body.companyName,
    role: req.body.role,
    status: req.body.status,
    dateApplied: req.body.dateApplied,
  });

  try {
    const newApplication = await application.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an application
router.put('/:id', async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApplication);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an application
router.delete('/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
