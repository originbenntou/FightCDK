import {
  type App,
  Stack,
  type StackProps,
  aws_route53,
  aws_route53_targets,
  type aws_apigateway, CfnOutput
} from 'aws-cdk-lib'

interface Route53StackProps extends StackProps {
  hostedZoneId: string
  customDomain: string
  apiGw: aws_apigateway.RestApi
}

export class Route53Stack extends Stack {
  constructor (scope: App, id: string, props: Route53StackProps) {
    super(scope, id, props)

    new aws_route53.ARecord(this, 'AliasRecord', {
      recordName: props.customDomain,
      target: aws_route53.RecordTarget.fromAlias(new aws_route53_targets.ApiGateway(props.apiGw)),
      zone: aws_route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.customDomain
      })
    })

    new CfnOutput(this, 'ApiUrl', {
      value: `https://${props.customDomain}/${props.apiGw.deploymentStage.stageName}/hello`
    })
  }
}
