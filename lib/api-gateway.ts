import * as cdk from 'aws-cdk-lib'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class ApiGatewayStack extends cdk.Stack {
  public readonly apiGateway: apigw.RestApi

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.apiGateway = new apigw.RestApi(this, 'MyApi', {
      restApiName: 'MyApiGateway',
      // Other properties for your API Gateway...
    })

    // Output the API Gateway URL
    new cdk.CfnOutput(this, 'ApiGatewayURL', {
      value: this.apiGateway.url,
    })
  }
}
