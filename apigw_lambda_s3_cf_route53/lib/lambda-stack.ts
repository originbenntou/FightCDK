import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

interface LambdaStackProps extends cdk.StackProps {
  apiGw: apigw.RestApi
}

export class LambdaStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    // FIXME: DockerImage
    const yourLambda = new lambda.Function(this, 'HelloWorld', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: cdk.PhysicalName.GENERATE_IF_NEEDED
    })

    const lambdaIntegration = new apigw.LambdaIntegration(yourLambda)

    const resource = props.apiGw.root.addResource('hello')
    resource.addMethod('ANY', lambdaIntegration)
  }
}
