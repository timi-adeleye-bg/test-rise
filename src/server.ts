import App from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import FolderRoute from './routes/folders.route';
import FileRoute from './routes/files.route';

ValidateEnv();

const app = new App([new AuthRoute(), new UserRoute(), new FolderRoute(), new FileRoute()]);

app.listen();
