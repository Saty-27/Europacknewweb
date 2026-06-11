"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveVerificationFile = exports.updateSiteSettings = exports.getSiteSettings = void 0;
const SiteSettings_1 = __importDefault(require("../models/SiteSettings"));
// Get site settings (Public & Admin)
const getSiteSettings = async (req, res) => {
    try {
        let settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            settings = await SiteSettings_1.default.create({
                googleSiteVerification: '',
                bingSiteVerification: '',
                yahooSiteVerification: '',
                googleAnalyticsId: '',
                htmlVerificationFiles: []
            });
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getSiteSettings = getSiteSettings;
// Update site settings (Admin only)
const updateSiteSettings = async (req, res) => {
    try {
        const settings = await SiteSettings_1.default.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.updateSiteSettings = updateSiteSettings;
// Public endpoint to dynamically serve any registered HTML verification file
const serveVerificationFile = async (req, res) => {
    try {
        const filename = req.params.filename;
        const settings = await SiteSettings_1.default.findOne();
        if (!settings) {
            return res.status(404).send('Not Found');
        }
        const verificationFile = settings.htmlVerificationFiles.find((f) => f.filename.toLowerCase() === filename.toLowerCase());
        if (!verificationFile) {
            return res.status(404).send('Not Found');
        }
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(verificationFile.content);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
};
exports.serveVerificationFile = serveVerificationFile;
