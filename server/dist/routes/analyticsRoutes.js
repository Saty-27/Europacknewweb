"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_1 = require("../controllers/analyticsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/log', analyticsController_1.logVisit);
router.get('/stats', auth_1.protect, auth_1.admin, analyticsController_1.getStats);
exports.default = router;
