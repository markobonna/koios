#!/usr/bin/env node
'use strict'

const exec = require('child_process').exec

//
// VERCEL_GITHUB_COMMIT_REF & VERCEL_GITHUB_COMMIT_SHA need to be added with empty
// values in Vercel environment variables, making them available to builds.
// https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
//
process.stdout.write(
  JSON.stringify(
    {
      version: require('../package.json').version,
      branch: process.env.VERCEL_GIT_COMMIT_REF || process.env.BRANCH || 'dev',
      commit:
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.COMMIT_REF ||
        exec(`git rev-parse HEAD`).toString().trim()
    },
    null,
    '  '
  )
)
