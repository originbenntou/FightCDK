import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'
import type * as apigw from 'aws-cdk-lib/aws-apigateway'

interface Route53StackProps extends cdk.StackProps {
  hostedZoneId: string
  customDomain: string
  apiGw: apigw.RestApi
}

export class Route53Stack extends cdk.Stack {
  constructor (scope: Construct, id: string, props: Route53StackProps) {
    super(scope, id, props)

    new route53.ARecord(this, 'AliasRecord', {
      recordName: props.customDomain,
      target: route53.RecordTarget.fromAlias(new route53Targets.ApiGateway(props.apiGw)),
      zone: route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
        hostedZoneId: props.hostedZoneId,
        zoneName: props.customDomain
      })
    })
  }
}
