import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import type * as s3 from 'aws-cdk-lib/aws-s3'
import { type OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'

interface CloudFrontProps extends cdk.StackProps {
  bucket: s3.Bucket
  oai: OriginAccessIdentity

}
export class CloudFrontStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props: CloudFrontProps) {
    super(scope, id, props)

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'StaticWebsiteDistribution', {
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
              allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
              defaultTtl: cdk.Duration.seconds(3600),
              maxTtl: cdk.Duration.seconds(86400),
              minTtl: cdk.Duration.seconds(0)
            }
          ]
        }
      ]
    })

    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: `https://${distribution.distributionDomainName}`
    })
  }
}
