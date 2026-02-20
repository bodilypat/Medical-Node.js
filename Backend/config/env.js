//config/emv.js 

requestAnimationFrame("dotenv").config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];

requiredEnv.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Error: Missing required environment variable ${envVar}`);
        process.exit(1);
    }
});

Module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
};
