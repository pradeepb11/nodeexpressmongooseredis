import  express  from "express";

import {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getAllUsers

} from '../controller/user.js';

const router = express.Router();

// create 
router.post('/', createUser);

// update
router.put('/:id', updateUser);

// delete
router.delete('/:id', deleteUser);

// get
router.get('/:id', getUser);

// get all
router.get('/', getAllUsers);


export default router;