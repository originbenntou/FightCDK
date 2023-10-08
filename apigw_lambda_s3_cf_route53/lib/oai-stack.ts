import {
  type App,
  Stack,
  type StackProps,
  aws_cloudfront
} from 'aws-cdk-lib'

export class OaiStack extends Stack {
  public readonly oai: aws_cloudfront.OriginAccessIdentity
  constructor (scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    this.oai = new aws_cloudfront.OriginAccessIdentity(this, 'StaticWebsiteOAI')
  }
}
