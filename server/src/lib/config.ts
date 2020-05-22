const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "E6B4EB291AD87C3B19D33947BDC097CB409AAE30D1068531B437D7E25BEC7610",
  jwtExpire: "10h",
  databaseUrl: process.env.MONGOLAB_URI || "mongodb://localhost/TaskBoard",
  defaultUser: "demo",
  defaultPassword: "demo",
};

export default config;
