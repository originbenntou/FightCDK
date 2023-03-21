#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { ApiGatewayStack } from '../lib/api-gateway-stack'
import { LambdaStack } from '../lib/lambda-stack'

const app = new cdk.App()

const apiGatewayStack = new ApiGatewayStack(app, 'ApiGatewayStack')
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
  apiGw: apiGatewayStack.apiGw,
})
apiGatewayStack.addDependency(lambdaStack)

app.synth()
