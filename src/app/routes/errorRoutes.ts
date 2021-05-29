import { ErrorLogController} from "../controllers/errorLogControllers"
import * as express from 'express'


export const errorRoute = express.Router();

errorRoute.get('/',ErrorLogController.getErrorLog);
errorRoute.post('/',ErrorLogController.saveError);
