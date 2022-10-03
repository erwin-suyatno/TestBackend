import express from "express";
import { getAllMembers, addMember } from "../controller/MemberController.js";

const routerMember = express.Router();

routerMember.get('/members', getAllMembers);
routerMember.post('/members/add', addMember);


export default routerMember;