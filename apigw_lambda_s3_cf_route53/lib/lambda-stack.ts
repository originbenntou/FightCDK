import {
  type App,
  Stack,
  type StackProps,
  PhysicalName,
  aws_lambda,
  aws_apigateway
} from 'aws-cdk-lib'

interface LambdaStackProps extends StackProps {
  apiGw: aws_apigateway.RestApi
}

export class LambdaStack extends Stack {
  constructor (scope: App, id: string, props: LambdaStackProps) {
    super(scope, id, props)

    // FIXME: DockerImage
    const yourLambda = new aws_lambda.Function(this, 'HelloWorld', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      functionName: PhysicalName.GENERATE_IF_NEEDED
    })

    const lambdaIntegration = new aws_apigateway.LambdaIntegration(yourLambda)

    const resource = props.apiGw.root.addResource('hello')
    resource.addMethod('ANY', lambdaIntegration)
  }
}
