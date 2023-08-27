import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'

export class OaiStack extends cdk.Stack {
  public readonly oai: cloudfront.OriginAccessIdentity
  constructor (scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    this.oai = new cloudfront.OriginAccessIdentity(this, 'StaticWebsiteOAI')
  }
}
