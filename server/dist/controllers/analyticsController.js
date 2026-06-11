"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.logVisit = void 0;
const PageVisit_1 = __importDefault(require("../models/PageVisit"));
const logVisit = async (req, res) => {
    try {
        const { url, referrer, sessionId } = req.body;
        const userAgent = req.headers['user-agent'] || '';
        const ip = req.ip || '';
        await PageVisit_1.default.create({
            url,
            referrer,
            sessionId,
            userAgent,
            ip
        });
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.logVisit = logVisit;
const getStats = async (req, res) => {
    try {
        const totalVisits = await PageVisit_1.default.countDocuments();
        const uniqueSessions = await PageVisit_1.default.distinct('sessionId');
        // Top visited pages
        const topPages = await PageVisit_1.default.aggregate([
            { $group: { _id: '$url', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.status(200).json({
            success: true,
            data: {
                totalVisits,
                uniqueVisitors: uniqueSessions.length,
                topPages
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getStats = getStats;
