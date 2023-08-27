import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'

interface CustomApiGWProps extends cdk.StackProps {
  customDomain: string
  certificateArn: string
}

export class ApiGatewayStack extends cdk.Stack {
  public readonly apiGw: apigw.RestApi

  constructor (scope: Construct, id: string, props: CustomApiGWProps) {
    super(scope, id, props)

    // FIXME: v1,v2...複数バージョンの管理方法を考える
    this.apiGw = new apigw.RestApi(this, 'HelloApi', {
      restApiName: 'HelloApi',
      deployOptions: {
        stageName: 'v1'
      }
    })

    this.apiGw.addDomainName('CustomDomain', {
      domainName: props.customDomain,
      basePath: 'v1',
      certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      endpointType: apigw.EndpointType.REGIONAL
    })
  }
}
