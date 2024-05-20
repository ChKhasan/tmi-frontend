module.exports = {
  apps: [
    {
      name: "TMII.uz",
      port: 3137,
      exec_mode: "cluster",
      instances: "1",
      script: "./.output/server/index.mjs",
      args: "preview",
    },
  ],
};
