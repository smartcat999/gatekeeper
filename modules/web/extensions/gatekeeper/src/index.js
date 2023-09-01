import routes from './routes';
import locales from './locales';

const menus = [{
  parent: 'cluster',
  name: 'gatekeeper',
  title: 'Gatekeeper',
  icon: 'key',
  order: 99,
  skipAuth: true,
},{
  parent: 'cluster.gatekeeper',
  name: 'gatekeeper.constrainttemplates',
  title: 'Constraint Templates',
  order: 0,
  skipAuth: true,
},
{
  parent: 'cluster.gatekeeper',
  name: 'gatekeeper.constraints',
  title: 'Constraints',
  order: 1,
  skipAuth: true,
}]


const extensionConfig = {
  menus,
  routes,
  locales,
};

globals.context.registerExtension(extensionConfig);
