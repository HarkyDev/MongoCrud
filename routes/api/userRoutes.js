const router = require ('express').Router()
const { getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
 } = require ("../../controllers/user-controller")

router.route("/").get(getUsers).post(createUser)

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
