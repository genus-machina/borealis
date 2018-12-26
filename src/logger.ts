import bunyan from 'bunyan';
import project from './project';

export default bunyan.createLogger({name: project.name});
