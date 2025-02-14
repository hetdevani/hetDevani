exports.checkAccess = async (req, res, next) => {
    try {
        const key = req.body.key || req.query.key || req.headers.key;
        console.log("Received Key:", key);
        console.log("Expected Key from Env:", process.env.key); // Log env variable
        
        if (!process.env.key) {
            return res.status(500).json({ message: "KEY is not set in environment variables!" });
        }

        if (key === process.env.key) { 
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized access!" });
        }
    } catch (error) {
        console.error("Error in checkAccess:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
