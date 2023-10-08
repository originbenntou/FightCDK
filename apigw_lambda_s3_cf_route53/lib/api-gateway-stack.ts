import {
  type App,
  Stack,
  type StackProps,
  aws_apigateway,
  aws_certificatemanager
} from 'aws-cdk-lib'

interface CustomApiGWProps extends StackProps {
  customDomain: string
  certificateArn: string
}

export class ApiGatewayStack extends Stack {
  public readonly apiGw: aws_apigateway.RestApi

  constructor (scope: App, id: string, props: CustomApiGWProps) {
    super(scope, id, props)

    // FIXME: v1,v2...複数バージョンの管理方法を考える
    this.apiGw = new aws_apigateway.RestApi(this, 'HelloApi', {
      restApiName: 'HelloApi',
      deployOptions: {
        stageName: 'v1'
      }
    })

    this.apiGw.addDomainName('CustomDomain', {
      domainName: props.customDomain,
      basePath: 'v1',
      certificate: aws_certificatemanager.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      endpointType: aws_apigateway.EndpointType.REGIONAL
    })
  }
}
