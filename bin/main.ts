#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { ApiGatewayStack } from '../lib/api-gateway-stack'
import { LambdaStack } from '../lib/lambda-stack'

const app = new cdk.App()

// FIXME: context
// https://dev.classmethod.jp/articles/aws-cdk-multi-environment-config/
const customDomain = app.node.tryGetContext('customDomain') as string
const hostedZoneId = app.node.tryGetContext('hostedZoneId') as string
const certificateArn = app.node.tryGetContext('certificateArn') as string

const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack', {
  customDomain,
  hostedZoneId,
  certificateArn
})
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  apiGw: apiGatewayStack.apiGw
})
apiGatewayStack.addDependency(lambdaStack)

app.synth()
