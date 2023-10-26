import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import jwt from 'jsonwebtoken'

export const handler = async (events: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(events.body!)

  const verified = jwt.verify(body.token, 'thisissecretkey')

  if (verified) {
    const response = {
      'statusCode': 200,
      'headers': {
        'Content-Type': '*/*'
      },
      'body': JSON.stringify({
        success: true,
        body: {
          verified
        }
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
      error: 'invalid token'
    }),
    'isBase64Encoded': false
  }

  return response
}