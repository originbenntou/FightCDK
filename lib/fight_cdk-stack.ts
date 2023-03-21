import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'

export class FightCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // Lambda function
    const helloLambda = new lambda.Function(this, 'HelloLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
    })

    // API Gateway REST API
    const api = new apigateway.RestApi(this, 'HelloApi', {
      restApiName: 'Hello API',
    })

    // Lambda integration
    const helloLambdaIntegration = new apigateway.LambdaIntegration(helloLambda)

    // API Gateway resource and method
    const helloResource = api.root.addResource('hello')
    helloResource.addMethod('GET', helloLambdaIntegration)
  }
}
