import {
  type App,
  Stack,
  type StackProps,
  Duration,
  aws_cloudfront,
  type aws_s3, CfnOutput
} from 'aws-cdk-lib'

interface CloudFrontProps extends StackProps {
  bucket: aws_s3.Bucket
  oai: aws_cloudfront.OriginAccessIdentity

}
export class CloudFrontStack extends Stack {
  public readonly cfn_distribution: aws_cloudfront.CloudFrontWebDistribution

  constructor (scope: App, id: string, props: CloudFrontProps) {
    super(scope, id, props)

    this.cfn_distribution = new aws_cloudfront.CloudFrontWebDistribution(this, 'StaticWebsiteDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: props.bucket,
            originAccessIdentity: props.oai
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              // allowedMethods: aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              defaultTtl: Duration.seconds(3600),
              maxTtl: Duration.seconds(86400),
              minTtl: Duration.seconds(0)
            }
          ]
        }
      ]
    })

    new CfnOutput(this, 'WebsiteUrl', {
      value: `https://${this.cfn_distribution.distributionDomainName}`
    })
  }
}
