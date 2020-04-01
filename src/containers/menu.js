// 菜单
const menus = [
  {
    name: 'TopHeader',
    icon: 'channel',
    path: '/ComponentList',
    auth: ['SYSTEM_MANAGER', 'DEVELOPER'], // 可看见的角色
    children: [],
  },
  {
    name: 'demo1',
    icon: 'channel',
    path: '/demo1',
    auth: ['SYSTEM_MANAGER', 'DEVELOPER'], // 可看见的角色
    children: [],
  },
  {
    name: 'test',
    icon: 'channel',
    path: '/test',
    auth: ['SYSTEM_MANAGER', 'DEVELOPER'], // 可看见的角色
    children: [],
  },
  {
    name: 'd3',
    icon: 'channel',
    path: '/d3',
    auth: ['SYSTEM_MANAGER', 'DEVELOPER'], // 可看见的角色
    children: [],
  },
  {
    name: 'SvgDemo',
    icon: 'channel',
    path: '/SvgDemo',
    auth: ['SYSTEM_MANAGER', 'DEVELOPER'], // 可看见的角色
    children: [],
  },
];

const menuNames = [
  { name: 'TopHeader', checkName: 'TopHeader', openName: '' },
  { name: 'demo1', checkName: 'demo1', openName: '' },
  { name: 'test', checkName: 'test', openName: '' },
  { name: 'd3', checkName: 'd3', openName: '' },
  { name: 'SvgDemo', checkName: 'SvgDemo', openName: '' },
];

export {
  menus,
  menuNames,
};
