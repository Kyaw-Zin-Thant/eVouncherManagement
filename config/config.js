const env = process.env.NODE_ENV || "local";

const envConfig = {
  local: {
    port: 8080,
    db: {
      user: "kyawzin",
      pass: "Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z",
      dbName: "vouncher",
      host: "localhost",
      dbPort: "8081",
    },
  },
  development: {
    port: 7001,
    db: {
      user: "kyawzin",
      pass: "Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z",
      dbName: "vouncher",
      host: "127.0.0.1",
      dbPort: "27017",
    },
  },
  production: {
    port: 7001,
    db: {
      user: "pte",
      user: "kyawzin",
      pass: "Bba?Dk=k:Jv{Q9S<A_e=G&b`h_b;[X?Z",
      dbName: "127.0.0.1",
      dbPort: "27017",
    },
  },
};

exports.config = {
  ...envConfig[env],
};
