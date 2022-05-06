const fetchAdmin = (req, res, next) => {
    try {
        // Get the user from the header file
        const id = req.header('admin-id');
        if (!id) {
            res.status(401).send({ error: "Invalid Admin Id" })
        }
        req.adminId = id;
        next();
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
}
module.exports = fetchAdmin;