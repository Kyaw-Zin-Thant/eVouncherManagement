const env = process.env.NODE_ENV || "local";

const envConfig = {
  local: {
    port: 8080,
    db: {
      user: "kyawzin",
      pass: "8a4DJzCQEdCYCACe",
      dbName: "vouncherSystem",
    },
  },
  development: {
    port: 7001,
    db: {
      user: "kyawzin",
      pass: "8a4DJzCQEdCYCACe",
      dbName: "vouncherSystem",
    },
  },
  production: {
    port: 7001,
    db: {
      user: "kyawzin",
      pass: "8a4DJzCQEdCYCACe",
      dbName: "vouncherSystem",
    },
  },
};

exports.config = {
  ...envConfig[env],
};
