import { useBase, createRouter, defineEventHandler } from "h3";
import * as userCtroller from '~/server/controller/user'

const router = createRouter();

router.get('/user', defineEventHandler(userCtroller.read));
router.post('/user', defineEventHandler(userCtroller.create));
router.get('/user/:id', defineEventHandler(userCtroller.detail));
router.put('/user/:id', defineEventHandler(userCtroller.update));
router.delete('/user/:id', defineEventHandler(userCtroller.remove));

export default useBase('/api', router.handler);