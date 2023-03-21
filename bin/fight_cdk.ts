#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { FightCdkStack } from '../lib/fight_cdk-stack'

const app = new cdk.App()
new FightCdkStack(app, 'FightCdkStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
})
