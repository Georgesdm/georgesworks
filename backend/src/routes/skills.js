const express = require('express');
const skillController = require('../controllers/skillsControllers');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/', skillController.getAllSkills);
router.post('/', authenticateToken, skillController.createSkill);
router.get('/:id', skillController.getOneSkill);
router.put('/:id', authenticateToken, skillController.updateSkill);
router.delete('/:id', authenticateToken, skillController.deleteSkill);


module.exports = router;