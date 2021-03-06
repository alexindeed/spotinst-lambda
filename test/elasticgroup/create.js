var _ = require('lodash'),
  assert = require('assert'),
  create = require('../../lib/resources/elasticgroup/create'),
  elasticgroup = require('../../lib/resources/elasticgroup'),
  lambda = require('../../'),
  nock         = require('nock'),
  sinon     = require('sinon'),
  util      = require('lambda-formation').util;

var groupConfig = {
  "group": {
    "name": "test",
    "strategy": {
      "risk": 100,
      "onDemandCount": null,
      "availabilityVsCost": "balanced"
    },
    "capacity": {
      "target": 1,
      "minimum": 1,
      "maximum": 1
    },
    "scaling": {},
    "compute": {
      "instanceTypes": {
        "ondemand": "m3.medium",
        "spot": [
          "m3.medium"
        ]
      },
      "availabilityZones": [
        {
          "name": "us-east-1a",
          "subnetId": "subnet-11111111"
        }
      ],
      "launchSpecification": {
        "securityGroupIds": [
          "sg-11111111"
        ],
        "monitoring": false,
        "imageId": "ami-60b6c60a",
        "keyPair": "testkey"
      },
      "product": "Linux/UNIX"
    },
    "scheduling": {},
    "thirdPartiesIntegration": {}
  }
}

describe("elasticgroup", function() {
  beforeEach(()=>{
    nock.cleanAll();
    sandbox = sinon.createSandbox();
  })

  afterEach(()=>{
    sandbox.restore()
  });

  describe("create resource", function() {
    it("create handler should create a new group", function(done) {

      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      create.handler(
        _.merge({accessToken: ACCESSTOKEN}, groupConfig),
        context
      );
    });

    it("elasticgroup handler should create a new group", function(done) {
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      elasticgroup.handler(
        _.merge({
          requestType: 'Create',
          accessToken: ACCESSTOKEN
        },groupConfig),
        context
      );
    });

    it("lambda handler should create a new group", function(done) {
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      lambda.handler(
        _.merge({
          resourceType: 'elasticgroup',
          requestType: 'Create',
          accessToken: ACCESSTOKEN
        }, groupConfig),
        context
      );
    });

    it("lambda handler should create a new group from CloudFormation", function(done) {
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      lambda.handler({
        ResourceType: 'Custom::elasticgroup',
        RequestType: 'Create',
        ResourceProperties: _.merge({accessToken: ACCESSTOKEN},groupConfig)
      },context);
    });

    it("create handler should parse group config", function(done) {
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

       util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      let tempConfig = groupConfig

      tempConfig.group.compute.launchSpecification.loadBalancersConfig = {"targetGroupARNs":["arn1","arn2","arn3"]}

      create.handler(
        _.merge({accessToken: ACCESSTOKEN}, tempConfig),
        context
      );
    });

    it("creates group with autoTags, input tags not found", function(done){
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      create.handler(
        _.merge({
          accessToken: ACCESSTOKEN, 
          autoTag:true,
          LogicalResourceId:"Elastigroup",
          StackId:"arn::12345/test/67890"
        }, groupConfig),
        context
      );
    })

    it("creates group with autoTags, input tags found", function(done){
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"response":{"items":[{"id":"sig-a307d690"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.deepEqual(err, null)
        done()
      })

      let tempConfig = groupConfig

      tempConfig.group.compute.launchSpecification.tags = [{tagKey:"test", tagValue:"test"}] 

      create.handler(
        _.merge({
          accessToken: ACCESSTOKEN, 
          autoTag:true,
          LogicalResourceId:"Elastigroup",
          StackId:"arn::12345/test/67890"
        }, tempConfig),
        context
      );
    })
  });

  describe("fail to create resource", function(){
    var errRes = {
      "request": {},
      "response": {
          "status": {},
          "errors": [
              {"code": "GENERAL_ERROR"},
              {"code": "RequestLimitExceeded"},
              {"code": "RequestLimitExceeded"}
          ]
      }
    }

    it("fail 5 times with RequestLimitExceeded code", function(done){
      for (var i=0; i<5; i++) {
        nock('https://api.spotinst.io', {"encodedQueryParams":true})
        .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
        .reply(400, errRes);
      }

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err.split("\n")[1], 'RequestLimitExceeded: undefined')
        done()
      })

      create.handler(
        _.merge( {accessToken: ACCESSTOKEN }, groupConfig),
        context
      );
    })

    it("fail with not RequestLimitExceeded code", function(done){
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(400, {response:{errors:[{code:400,message:"ami-validation error"}]}});

      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, "elasticgroup create failed: 400: ami-validation error\n")
        done()
      })

      create.handler(
        _.merge( {accessToken: ACCESSTOKEN }, groupConfig),
        context
      );
    })

    it("fail one time with RequestLimitExceeded code then pass", function(done){
      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(400, errRes);

      nock('https://api.spotinst.io', {"encodedQueryParams":true})
      .post('/aws/ec2/group', {"group":{"name":"test","strategy":{"risk":100,"onDemandCount":null,"availabilityVsCost":"balanced"},"capacity":{"target":1,"minimum":1,"maximum":1},"scaling":{},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"},"product":"Linux/UNIX"},"scheduling":{},"thirdPartiesIntegration":{}}})
      .reply(200, {"request":{"id":"09c9bc9d-b234-4e06-bf2e-ec5f55033551","url":"/aws/ec2/group","method":"POST","timestamp":"2016-01-28T16:18:15.015Z"},"response":{"status":{"code":200,"message":"OK"},"kind":"spotinst:aws:ec2:group","items":[{"id":"sig-a307d690","name":"test","capacity":{"minimum":1,"maximum":1,"target":1},"strategy":{"risk":100,"availabilityVsCost":"balanced","drainingTimeout":0},"compute":{"instanceTypes":{"ondemand":"m3.medium","spot":["m3.medium"]},"availabilityZones":[{"name":"us-east-1a","subnetId":"subnet-11111111"}],"product":"Linux/UNIX","launchSpecification":{"securityGroupIds":["sg-11111111"],"monitoring":false,"imageId":"ami-60b6c60a","keyPair":"testkey"}},"scaling":{},"scheduling":{},"thirdPartiesIntegration":{},"createdAt":"2016-01-28T16:18:14.000+0000","updatedAt":"2016-01-28T16:18:14.000+0000"}],"count":1}}, { 'content-type': 'application/json; charset=utf-8'});
    
      util.done = sandbox.spy((err, event, context, body)=>{
        assert.equal(err, null)
        done()
      })

      create.handler(
        _.merge( {accessToken: ACCESSTOKEN }, groupConfig),
        context
      );
    })

    it("return error from spotUtil.getTokenAndConfigs", function(done){
      util.done = sandbox.spy((err, event, context, body)=>{
        assert.notEqual(err, null)
        done()
      })
      create.handler(
        _.merge({id:'sig-11111111',}, groupConfig),
        context
      );
    })

  })
});
