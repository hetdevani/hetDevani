exports.checkAccess = async (req, res, next) => {
    try {
        const key = req.body.key || req.query.key || req.headers.key;
        console.log('key :>> ', key);
        
        if (key) {
            if (key === process.env.KEY) { 
                return next();
            } else {
                return res.status(401).json({ message: "Unauthorized access!" });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized access!" });
        }
    } catch (error) {
        console.error('Error in checkAccess:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
