#!/usr/bin/env node
import { App } from 'aws-cdk-lib'
import { ApiGatewayStack } from '../lib/api-gateway-stack'
import { LambdaStack } from '../lib/lambda-stack'
import { Route53Stack } from '../lib/route53-stack'
import { S3Stack } from '../lib/s3-stack'
import { CloudFrontStack } from '../lib/cloud-front-stack'
import { OaiStack } from '../lib/oai-stack'
import * as dotenv from 'dotenv'

const app = new App()

dotenv.config()
const customDomain = process.env.CUSTOM_DOMAIN ?? ''
const hostedZoneId = process.env.HOSTED_ZONE_ID ?? ''
const certificateArn = process.env.CERTIFICATE_ARN ?? ''

// backend
const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  customDomain,
  certificateArn
})
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  apiGw: apiGatewayStack.apiGw
})
const route53Stack = new Route53Stack(app, 'Route53Stack', {
  customDomain,
  hostedZoneId,
  apiGw: apiGatewayStack.apiGw
})

apiGatewayStack.addDependency(lambdaStack)
route53Stack.addDependency(apiGatewayStack)

// frontend
const oaiStack = new OaiStack(app, 'OaiStack')
const s3Stack = new S3Stack(app, 'S3Stack', {
  oai: oaiStack.oai
})
const cloudfrontStack = new CloudFrontStack(app, 'CloudFrontStack', {
  bucket: s3Stack.bucket,
  oai: oaiStack.oai
})

s3Stack.addDependency(oaiStack)
cloudfrontStack.addDependency(s3Stack)

app.synth()
