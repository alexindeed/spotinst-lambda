var _ = require('lodash'),
  assert = require('assert'),
  nock = require('nock');
  util = require('../../lib/util'),
  nock         = require('nock'),
  sinon        = require('sinon');


var groupConfig = {'group':{'name':'Test-Group','capacity':{'minimum':1,'maximum':10,'target':1},'strategy':{'risk':100,'availabilityVsCost':'balanced'},'compute':{'instanceTypes':{'ondemand':'t2.nano','spot':['m4.large','m4.xlarge']},'availabilityZones':[{'name':'us-west-2a','subnetId':'subnet-123456'},{'name':'us-west-2b','subnetId':'subnet-45678'},{'name':'us-west-2c','subnetId':'subnet-91011'}],'product':'Linux/UNIX','launchSpecification':{'securityGroupIds':['sg-cc32c7a9'],'monitoring':false,'imageId':'ami-f0091d91','iamRole':{'name':'ecsInstanceRole'},'keyPair':'KeyOregon'}},'scaling':{},'scheduling':{},'thirdPartiesIntegration':{}}};

describe("util getTokenAndConfig", function() {
  beforeEach(()=>{
      nock.cleanAll();
      sandbox = sinon.createSandbox();
  })

  afterEach(()=>{
      sandbox.restore()
  });


  it("should find the accessToken and groupConfig", function(cb) {
    util.getTokenAndConfig(_.merge({accessToken: 123456}, groupConfig),function(err,res) {
      assert.ifError(err);
      assert.deepEqual(res,{token: 123456, config: groupConfig.group});
      cb();
    });
  });

  it("should find the accessToken and groupConfig from CloudFormation", function(cb) {
    util.getTokenAndConfig({ResourceProperties: _.merge({accessToken: 123456}, groupConfig)},function(err,res) {
      assert.ifError(err);
      assert.deepEqual(res,{token: 123456, config: groupConfig.group});
      cb();
    });
  });

});
