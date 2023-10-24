import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import jwt from 'jsonwebtoken'

const dynamo = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(dynamo)

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const user = await client.send(
    new GetCommand({
      TableName: 'DynamoUsers',
      Key: {
        username: body.name
      }
    })
  )

  if (user.Item && user.Item.password === body.password) {
    const response = {
      'statusCode': 200,
      'headers': {
        'Content-Type': '*/*'
      },
      'body': JSON.stringify({
        success: true,
        token: jwt.sign({ username: user.Item.username }, 'jwtSecretKey', { expiresIn: '3d' })
      }),
      'isBase64Encoded': false
    }
    return response
  }

  const response = {
    'statusCode': 401,
    'headers': {
      'Content-Type': '*/*'
    },
    'body': JSON.stringify({
      success: false,
      error: 'username or password invalid'
    }),
    'isBase64Encoded': false
  }

  return response
}