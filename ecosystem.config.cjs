module.exports = {
  apps: [
    {
      name: 'online_editor_web',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
