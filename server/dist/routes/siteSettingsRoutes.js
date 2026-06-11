"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const siteSettingsController_1 = require("../controllers/siteSettingsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', siteSettingsController_1.getSiteSettings);
router.put('/', auth_1.protect, (0, auth_1.authorize)('Super Admin', 'Admin'), siteSettingsController_1.updateSiteSettings);
// Public route to dynamically serve files like google12345.html
router.get('/file/:filename', siteSettingsController_1.serveVerificationFile);
exports.default = router;
