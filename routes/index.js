'use strict';

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Sidekick Solutions – AI Agents & Automation for Modern Businesses',
    description:
      'Sidekick Solutions builds agentic AI systems, automated workflows, and custom AI tools that supercharge business productivity.',
  });
});

module.exports = router;
