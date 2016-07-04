var config = {
  REDISURL: 'redis://localhost:6379',
  PORT: 3000,
};

function getEnv(variable){
  if (process.env[variable] === undefined){
    throw new Error('You must create an environment variable for ' + variable);
  }
  return process.env[variable];
};

module.exports = config;