import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class ApiGatewayStack extends cdk.Stack {
  public readonly apiGw: apigw.RestApi

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.apiGw = new apigw.RestApi(this, 'YourApi', {
      restApiName: 'YourApi',
    })

    new cdk.CfnOutput(this, 'ApiGatewayURL', {
      value: this.apiGw.url,
    })
  }
}
