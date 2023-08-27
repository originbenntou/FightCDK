import * as cdk from 'aws-cdk-lib'
import { type Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { type OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'
import * as iam from 'aws-cdk-lib/aws-iam'

interface S3StackProps extends cdk.StackProps {
  oai: OriginAccessIdentity
}
export class S3Stack extends cdk.Stack {
  public readonly bucket: s3.Bucket
  constructor (scope: Construct, id: string, props: S3StackProps) {
    super(scope, id, props)

    this.bucket = new s3.Bucket(this, 'StaticBucket', {
      bucketName: 'fight-cdk-static',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    this.bucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: [
        's3:GetObject'
      ],
      resources: [
        `${this.bucket.bucketArn}/*`
      ],
      principals: [
        new iam.CanonicalUserPrincipal(props.oai.cloudFrontOriginAccessIdentityS3CanonicalUserId),
      ]
    }))
  }
}
