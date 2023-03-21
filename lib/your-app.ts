import * as cdk from 'aws-cdk-lib'
import { ApiGatewayStack } from './api-gateway-stack'
import { LambdaStack } from './lambda-stack'

export class YourApp extends cdk.App {
  constructor() {
    super()

    const apiGatewayStack = new ApiGatewayStack(this, 'ApiGatewayStack')
    const lambdaStack = new LambdaStack(this, 'LambdaStack', {
      apiGw: apiGatewayStack.apiGw,
    })

    apiGatewayStack.addDependency(lambdaStack)
  }
}
