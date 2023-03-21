import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export interface LambdaStackProps extends cdk.StackProps {
  apiGateway: apigw.RestApi
}

export class LambdaStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    const myLambda = new lambda.Function(this, 'MyLambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      // Other properties for your Lambda function...
    })

    const lambdaIntegration = new apigw.LambdaIntegration(myLambda)

    const resource = props.apiGateway.root.addResource('my-resource')
    resource.addMethod('GET', lambdaIntegration)
  }
}
