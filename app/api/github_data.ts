// pages/api/github-data.ts

import { graphql } from '@octokit/graphql'
import { Octokit } from '@octokit/rest'
import type { NextApiRequest, NextApiResponse } from 'next'

type GitHubData = {
  name: string
  bio: string
  publicRepos: number
  contributionsLastYear: number
  pinnedRepos: Array<{
    name: string
    description: string
    stars: number
  }>
}

type GraphQLResponse = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number
      }
    }
    pinnedItems: {
      nodes: Array<{
        name: string
        description: string | null
        stargazerCount: number
      }>
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubData | { error: string }>
) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  })

  try {
    // Fetch user data
    const { data: userData } = await octokit.users.getByUsername({
      username: 'mgkram4',
    })

    // Fetch pinned repositories and contributions using GraphQL
    const githubData = await graphqlWithAuth<GraphQLResponse>(`
      {
        user(login: "mgkram4") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                stargazerCount
              }
            }
          }
        }
      }
    `)

    const data: GitHubData = {
      name: userData.name || 'Mark',
      bio: userData.bio || '(⌐■-■) | Fullstack | ML',
      publicRepos: userData.public_repos || 0,
      contributionsLastYear: githubData.user.contributionsCollection.contributionCalendar.totalContributions,
      pinnedRepos: githubData.user.pinnedItems.nodes.map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        stars: repo.stargazerCount,
      })),
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    res.status(500).json({ error: 'Error fetching GitHub data' })
  }
}