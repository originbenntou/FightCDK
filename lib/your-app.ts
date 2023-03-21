import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { ApiGatewayStack } from './api-gateway-stack'
import { LambdaStack } from './lambda-stack'

export class YourApp extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const apiGatewayStack = new ApiGatewayStack(this, 'ApiGatewayStack')
    const lambdaStack = new LambdaStack(this, 'LambdaStack', {
      apiGw: apiGatewayStack.apiGw,
    })

    // lambdaStack.addDependency(apiGatewayStack)
  }
}
