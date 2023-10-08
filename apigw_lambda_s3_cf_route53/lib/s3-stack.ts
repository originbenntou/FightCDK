import {
  type App,
  Stack,
  type StackProps,
  RemovalPolicy,
  aws_s3,
  type aws_cloudfront,
  aws_iam
} from 'aws-cdk-lib'

interface S3StackProps extends StackProps {
  oai: aws_cloudfront.OriginAccessIdentity
}
export class S3Stack extends Stack {
  public readonly bucket: aws_s3.Bucket
  constructor (scope: App, id: string, props: S3StackProps) {
    super(scope, id, props)

    this.bucket = new aws_s3.Bucket(this, 'StaticBucket', {
      bucketName: 'fight-cdk-static',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY
    })

    this.bucket.addToResourcePolicy(new aws_iam.PolicyStatement({
      actions: [
        's3:GetObject'
      ],
      resources: [
        `${this.bucket.bucketArn}/*`
      ],
      principals: [
        new aws_iam.CanonicalUserPrincipal(props.oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)
      ]
    }))
  }
}
