const fetchUser = (req, res, next) => {
    try {
        // Get the user from the header file
        const id = req.header('user-id');
        if (!id) {
            res.status(401).send({ error: "Invalid User Id" })
        }
        req.userId = id;
        next();
    } catch (error) {
        res.status(500).json({ "Server Error": error.message });
    }
}
module.exports = fetchUser;