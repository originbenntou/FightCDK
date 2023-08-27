#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { ApiGatewayStack } from '../lib/api-gateway-stack'
import { LambdaStack } from '../lib/lambda-stack'
import { Route53Stack } from '../lib/route53-stack'
import { S3Stack } from '../lib/s3-stack'
import { CloudFrontStack } from '../lib/cloud-front-stack'
import { OaiStack } from '../lib/oai-stack'

const app = new cdk.App()

// FIXME: context
// https://dev.classmethod.jp/articles/aws-cdk-multi-environment-config/
const customDomain = app.node.tryGetContext('customDomain') as string
const hostedZoneId = app.node.tryGetContext('hostedZoneId') as string
const certificateArn = app.node.tryGetContext('certificateArn') as string

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
// FIXME: ドメインとか、細かい設定値をいれる
const cloudfrontStack = new CloudFrontStack(app, 'CloudFrontStack', {
  bucket: s3Stack.bucket,
  oai: oaiStack.oai
})

s3Stack.addDependency(oaiStack)
cloudfrontStack.addDependency(s3Stack)

app.synth()
